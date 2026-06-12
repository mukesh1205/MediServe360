package com.medi360.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medi360.DTO.NotificationDTO;
import com.medi360.db.AppointmentRepository;
import com.medi360.db.DoctorRepository;
import com.medi360.db.PatientRepository;
import com.medi360.db.UserRepository;
import com.medi360.entities.Appointment;
import com.medi360.entities.Doctor;
import com.medi360.entities.Patient;
import com.medi360.entities.User;
import com.medi360.exception.AppointmentNotFoundException;
import com.medi360.exception.DoctorNotFoundException;
import com.medi360.exception.PatientNotFoundException;
import com.medi360.exception.SlotNotAvailableException;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              PatientRepository patientRepository,
                              DoctorRepository doctorRepository,
                              UserRepository userRepository,
                              NotificationService notificationService) {
        this.appointmentRepository  = appointmentRepository;
        this.patientRepository      = patientRepository;
        this.doctorRepository       = doctorRepository;
        this.userRepository         = userRepository;
        this.notificationService    = notificationService;
    }


    private void sendNotification(int userId, String message, String category) {
        try {
            NotificationDTO dto = new NotificationDTO();
            dto.setDoctorID(userId);
            dto.setPatientID(0);
            dto.setMessage(message);
            dto.setCategory(category);
            dto.setStatus("UNREAD");
            notificationService.addNotification(dto);
        } catch (Exception e) {
            System.err.println("Notification failed for userId " + userId + ": " + e.getMessage());
        }
    }

    //notify all receptionists
    private void notifyAllReceptionists(String message, String category) {
        List<User> receptionists = userRepository.findByRole("RECEPTIONIST");
        for (User r : receptionists) {
            sendNotification(r.getUserId(), message, category);
        }
    }

    //notify doctor by their email
    private void notifyDoctor(String doctorEmail, String message, String category) {
        userRepository.findByEmail(doctorEmail).ifPresent(user ->
            sendNotification(user.getUserId(), message, category)
        );
    }


    //Doctor Availability
    private boolean isDoctorAvailable(Doctor doctor, LocalTime appointmentTime) {
        if (doctor.getAvailabilitySchedule() == null) return false;
        String[] range     = doctor.getAvailabilitySchedule().split("-");
        LocalTime startTime = LocalTime.parse(range[0]);
        LocalTime endTime   = LocalTime.parse(range[1]);
        return !appointmentTime.isBefore(startTime) && !appointmentTime.isAfter(endTime);
    }

    private boolean overlaps(LocalTime start1, LocalTime end1,
                             LocalTime start2, LocalTime end2) {
        return start1.isBefore(end2) && start2.isBefore(end1);
    }


    // Slot finder
    private LocalDateTime findNextAvailableSlot(
            Doctor doctor, LocalDate requestedDate, LocalTime requestedStart,
            int durationMinutes, int excludeAppointmentId, int maxDaysAhead) {

        String[]  range    = doctor.getAvailabilitySchedule().split("-");
        LocalTime dayStart = LocalTime.parse(range[0]);
        LocalTime dayEnd   = LocalTime.parse(range[1]);

        for (int d = 0; d <= maxDaysAhead; d++) {
            LocalDate date      = requestedDate.plusDays(d);
            LocalTime candidate = (d == 0 && requestedStart.isAfter(dayStart))
                                    ? requestedStart : dayStart;

            while (!candidate.plusMinutes(durationMinutes).isAfter(dayEnd)) {
                LocalTime candidateEnd = candidate.plusMinutes(durationMinutes);
                boolean   conflict     = false;

                List<Appointment> existing = appointmentRepository
                        .findByDoctor_IdAndDateOrderByTimeAsc(doctor.getId(), date);

                for (Appointment a : existing) {
                    if (a.getId() == excludeAppointmentId) continue; // skip self

                    LocalTime existingStart = a.getTime();
                    LocalTime existingEnd   = existingStart.plusMinutes(a.getDurationMinutes());

                    if (overlaps(candidate, candidateEnd, existingStart, existingEnd)) {
                        conflict  = true;
                        candidate = existingEnd;
                        break;
                    }
                }

                if (!conflict) return LocalDateTime.of(date, candidate);
            }
        }
        return null;
    }

    private LocalDateTime findNextAvailableSlot(
            Doctor doctor, LocalDate requestedDate, LocalTime requestedStart,
            int durationMinutes, int maxDaysAhead) {
        return findNextAvailableSlot(
                doctor, requestedDate, requestedStart, durationMinutes, -1, maxDaysAhead);
    }


    //ADD Appointment
    @Transactional
    public Appointment addAppointment(Appointment appointment)
            throws PatientNotFoundException, DoctorNotFoundException, SlotNotAvailableException {

        Patient patient = patientRepository.findById(appointment.getPatient().getPatientId())
                .orElseThrow(() -> new PatientNotFoundException(
                        "Patient not found with id " + appointment.getPatient().getPatientId()));

        Doctor doctor = doctorRepository.findById(appointment.getDoctor().getId())
                .orElseThrow(() -> new DoctorNotFoundException(
                        "Doctor not found with id " + appointment.getDoctor().getId()));

        if (!isDoctorAvailable(doctor, appointment.getTime())) {
            throw new SlotNotAvailableException("Doctor is not available at this time");
        }

        LocalDateTime resolvedSlot = findNextAvailableSlot(
                doctor, appointment.getDate(), appointment.getTime(),
                appointment.getDurationMinutes(), 3);

        if (resolvedSlot == null) {
            throw new SlotNotAvailableException("No available slot for this doctor");
        }

        appointment.setStatus("BOOKED");

        if (!resolvedSlot.toLocalTime().equals(appointment.getTime()) ||
            !resolvedSlot.toLocalDate().equals(appointment.getDate())) {
            appointment.setTime(resolvedSlot.toLocalTime());
            appointment.setDate(resolvedSlot.toLocalDate());
            appointment.setStatus("RESCHEDULED");
        }

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);

        Appointment saved = appointmentRepository.save(appointment);

        //Notify doctor about new booking
        String bookMsg = String.format(
            "New appointment booked — Patient: %s on %s at %s.",
            patient.getPatientName(), saved.getDate(), saved.getTime());

        if (saved.getStatus().equals("RESCHEDULED")) {
            bookMsg += " (Original slot was taken — rescheduled automatically)";
        }

        if (doctor.getEmail() != null) {
            notifyDoctor(doctor.getEmail(), bookMsg, "APPOINTMENT");
        }

        return saved;
    }


    //UPDATE Appointment
    @Transactional
    public Appointment updateAppointment(Appointment updatedAppointment)
            throws AppointmentNotFoundException, PatientNotFoundException,
                   DoctorNotFoundException, SlotNotAvailableException {

        Appointment existingAppointment = appointmentRepository
                .findById(updatedAppointment.getId())
                .orElseThrow(() -> new AppointmentNotFoundException(
                        "Appointment not found with id " + updatedAppointment.getId()));

        Patient patient = patientRepository
                .findById(updatedAppointment.getPatient().getPatientId())
                .orElseThrow(() -> new PatientNotFoundException(
                        "Patient not found with id " + updatedAppointment.getPatient().getPatientId()));

        Doctor doctor = doctorRepository
                .findById(updatedAppointment.getDoctor().getId())
                .orElseThrow(() -> new DoctorNotFoundException(
                        "Doctor not found with id " + updatedAppointment.getDoctor().getId()));

        existingAppointment.setPatient(patient);
        existingAppointment.setDoctor(doctor);
        existingAppointment.setDurationMinutes(updatedAppointment.getDurationMinutes());

        String requestedStatus = updatedAppointment.getStatus();

        //Reason required for CANCELLED and RESCHEDULED
        if ("CANCELLED".equalsIgnoreCase(requestedStatus) ||
            "RESCHEDULED".equalsIgnoreCase(requestedStatus)) {
            if (updatedAppointment.getReason() == null ||
                updatedAppointment.getReason().trim().isEmpty()) {
                throw new SlotNotAvailableException(
                        "Reason is required when cancelling or rescheduling");
            }
        }

        //Block RESCHEDULED for past appointments
        if ("RESCHEDULED".equalsIgnoreCase(requestedStatus)) {
            if (updatedAppointment.getDate().isBefore(LocalDate.now())) {
                throw new SlotNotAvailableException(
                        "Cannot reschedule a past appointment");
            }
        }

        //COMPLETED
        if ("COMPLETED".equalsIgnoreCase(requestedStatus)) {
            existingAppointment.setStatus("COMPLETED");
            existingAppointment.setDate(updatedAppointment.getDate());
            existingAppointment.setTime(updatedAppointment.getTime());
            existingAppointment.setReason(updatedAppointment.getReason());
            Appointment saved = appointmentRepository.save(existingAppointment);

            //Notify receptionists - appointment completed
            notifyAllReceptionists(
                String.format("Appointment #%d for patient %s marked COMPLETED by %s.",
                    saved.getId(), patient.getPatientName(), doctor.getName()),
                "APPOINTMENT");

            return saved;
        }

        //CANCELLED
        if ("CANCELLED".equalsIgnoreCase(requestedStatus)) {
            existingAppointment.setStatus("CANCELLED");
            existingAppointment.setDate(updatedAppointment.getDate());
            existingAppointment.setTime(updatedAppointment.getTime());
            existingAppointment.setReason(updatedAppointment.getReason());
            Appointment saved = appointmentRepository.save(existingAppointment);

            // Notify all receptionists
            notifyAllReceptionists(
                String.format(
                    "Appointment #%d for patient %s on %s at %s has been CANCELLED by %s. Reason: %s. Please contact patient to rebook.",
                    saved.getId(), patient.getPatientName(),
                    saved.getDate(), saved.getTime(),
                    doctor.getName(), saved.getReason()),
                "CANCELLATION");

            return saved;
        }

        //RESCHEDULED
        if (!isDoctorAvailable(doctor, updatedAppointment.getTime())) {
            throw new SlotNotAvailableException(
                    "Doctor is not available at " + updatedAppointment.getTime()
                    + ". Working hours: " + doctor.getAvailabilitySchedule());
        }

        // Check if chosen slot is free
        List<Appointment> existingOnDay = appointmentRepository
                .findByDoctor_IdAndDateOrderByTimeAsc(
                        doctor.getId(), updatedAppointment.getDate());

        for (Appointment a : existingOnDay) {
            if (a.getId() == existingAppointment.getId()) continue; // skip self

            LocalTime existingEnd  = a.getTime().plusMinutes(a.getDurationMinutes());
            LocalTime newEnd       = updatedAppointment.getTime()
                                        .plusMinutes(updatedAppointment.getDurationMinutes());

            if (overlaps(updatedAppointment.getTime(), newEnd, a.getTime(), existingEnd)) {
                throw new SlotNotAvailableException(
                    "Slot " + updatedAppointment.getTime()
                    + " is already taken. Please choose a different time.");
            }
        }

        // Slot is free
        existingAppointment.setStatus("RESCHEDULED");
        existingAppointment.setDate(updatedAppointment.getDate());
        existingAppointment.setTime(updatedAppointment.getTime());
        existingAppointment.setReason(updatedAppointment.getReason());

        Appointment saved = appointmentRepository.save(existingAppointment);

        
        notifyAllReceptionists(
            String.format(
                "Appointment #%d for patient %s has been RESCHEDULED by %s to %s at %s. Reason: %s. Please inform the patient.",
                saved.getId(), patient.getPatientName(),
                doctor.getName(), saved.getDate(), saved.getTime(),
                saved.getReason()),
            "RESCHEDULE");

        //notify the doctor confirming the reschedule 
        if (doctor.getEmail() != null) {
            notifyDoctor(doctor.getEmail(),
                String.format(
                    "Your appointment #%d for patient %s has been rescheduled to %s at %s.",
                    saved.getId(), patient.getPatientName(),
                    saved.getDate(), saved.getTime()),
                "RESCHEDULE");
        }

        return saved;
    }


    //DELETE Appointment
    @Transactional
    public void deleteAppointment(int id) throws AppointmentNotFoundException {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException(
                        "Appointment not found with id " + id));
        appointmentRepository.delete(appointment);
    }


    //GET by ID
    public Appointment getAppointmentById(int id) throws AppointmentNotFoundException {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException(
                        "Appointment not found with id " + id));
    }


    //GET all
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }


    //GET all paginated
    public Page<Appointment> getAllAppointmentsWithPagination(Pageable pageable) {
        return appointmentRepository.findAll(pageable);
    }


    //GET by Doctor ID
    public List<Appointment> getAppointmentsByDoctorId(int doctorId)
            throws DoctorNotFoundException {
        doctorRepository.findById(doctorId)
                .orElseThrow(() -> new DoctorNotFoundException(
                        "Doctor not found with id " + doctorId));
        return appointmentRepository.findByDoctor_IdOrderByDateAscTimeAsc(doctorId);
    }


    //GET by Doctor ID and Date
    public List<Appointment> getAppointmentsByDoctorAndDate(int doctorId, LocalDate date)
            throws DoctorNotFoundException {
        doctorRepository.findById(doctorId)
                .orElseThrow(() -> new DoctorNotFoundException(
                        "Doctor not found with id " + doctorId));
        return appointmentRepository.findByDoctor_IdAndDateOrderByTimeAsc(doctorId, date);
    }
}





