package com.medi360.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medi360.db.AppointmentRepository;
import com.medi360.db.DoctorRepository;
import com.medi360.db.PatientRepository;
import com.medi360.entities.Appointment;
import com.medi360.entities.Doctor;
import com.medi360.entities.Patient;
import com.medi360.exception.AppointmentNotFoundException;
import com.medi360.exception.DoctorNotFoundException;
import com.medi360.exception.PatientNotFoundException;
import com.medi360.exception.SlotNotAvailableException;

@Service 	
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              PatientRepository patientRepository,
                              DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }
    
    
    //Doctor Availability Management
    private boolean isDoctorAvailable(Doctor doctor, LocalTime appointmentTime) {

        if (doctor.getAvailabilitySchedule() == null) {
            return false;
        }

        String[] range = doctor.getAvailabilitySchedule().split("-");
        LocalTime startTime = LocalTime.parse(range[0]);
        LocalTime endTime = LocalTime.parse(range[1]);

        return !appointmentTime.isBefore(startTime)
            && !appointmentTime.isAfter(endTime);
    }

    private boolean overlaps(
            LocalTime start1, LocalTime end1,
            LocalTime start2, LocalTime end2) {

        return start1.isBefore(end2) && start2.isBefore(end1);
    }

    private LocalDateTime findNextAvailableSlot(
            Doctor doctor,
            LocalDate requestedDate,
            LocalTime requestedStart,
            int durationMinutes,
            int maxDaysAhead) {

        String[] range = doctor.getAvailabilitySchedule().split("-");
        LocalTime dayStart = LocalTime.parse(range[0]);
        LocalTime dayEnd   = LocalTime.parse(range[1]);

        for (int d = 0; d <= maxDaysAhead; d++) {

            LocalDate date = requestedDate.plusDays(d);

            LocalTime candidate =
                    (d == 0 && requestedStart.isAfter(dayStart))
                            ? requestedStart
                            : dayStart;

            while (!candidate.plusMinutes(durationMinutes).isAfter(dayEnd)) {

                LocalTime candidateEnd =
                        candidate.plusMinutes(durationMinutes);

                boolean conflict = false;

                List<Appointment> existing =
                        appointmentRepository
                                .findByDoctor_IdAndDateOrderByTimeAsc(
                                        doctor.getId(), date);

                for (Appointment a : existing) {

                    LocalTime existingStart = a.getTime();
                    LocalTime existingEnd =
                            existingStart.plusMinutes(
                                    a.getDurationMinutes());

                    if (overlaps(candidate, candidateEnd,
                                 existingStart, existingEnd)) {
                        conflict = true;
                        candidate = existingEnd;
                        break;
                    }
                }

                if (!conflict) {
                    return LocalDateTime.of(date, candidate);
                }
            }
        }
        return null;
    }

    
    //ADD appointment
    @Transactional
    public Appointment addAppointment(Appointment appointment)
            throws PatientNotFoundException,
                   DoctorNotFoundException,
                   SlotNotAvailableException {

        Patient patient = patientRepository
                .findById(appointment.getPatient().getPatientId())
                .orElseThrow(() ->
                        new PatientNotFoundException(
                                "Patient not found with id "
                                + appointment.getPatient().getPatientId()));
       
        Doctor doctor = doctorRepository
                .findById(appointment.getDoctor().getId())
                .orElseThrow(() ->
                        new DoctorNotFoundException(
                                "Doctor not found with id "
                                + appointment.getDoctor().getId()));

        if (!isDoctorAvailable(doctor, appointment.getTime())) {
            throw new SlotNotAvailableException(
                    "Doctor is not available at this time");
        }

        LocalDateTime resolvedSlot =
                findNextAvailableSlot(
                        doctor,
                        appointment.getDate(),
                        appointment.getTime(),
                        appointment.getDurationMinutes(),
                        3
                );

        if (resolvedSlot == null) {
            throw new SlotNotAvailableException(
                    "No available slot for this doctor");
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

        return appointmentRepository.save(appointment);
    }

    
    
    //UPDATE Appointment    
    @Transactional
    public Appointment updateAppointment(Appointment updatedAppointment)
            throws AppointmentNotFoundException,
                   PatientNotFoundException,
                   DoctorNotFoundException,
                   SlotNotAvailableException {

        //Fetch existing appointment
        Appointment existingAppointment =
                appointmentRepository.findById(updatedAppointment.getId())
                .orElseThrow(() ->
                        new AppointmentNotFoundException(
                                "Appointment not found with id "
                                + updatedAppointment.getId()));

        //Validate patient
        Patient patient = patientRepository
                .findById(updatedAppointment.getPatient().getPatientId())
                .orElseThrow(() ->
                        new PatientNotFoundException(
                                "Patient not found with id "
                                + updatedAppointment.getPatient().getPatientId()));

        //Validate doctor
        Doctor doctor = doctorRepository
                .findById(updatedAppointment.getDoctor().getId())
                .orElseThrow(() ->
                        new DoctorNotFoundException(
                                "Doctor not found with id "
                                + updatedAppointment.getDoctor().getId()));

        //Availability check
        if (!isDoctorAvailable(doctor, updatedAppointment.getTime())) {
            throw new SlotNotAvailableException(
                    "Doctor is not available at this time");
        }

        //Find next available slot
        LocalDateTime resolvedSlot =
                findNextAvailableSlot(
                        doctor,
                        updatedAppointment.getDate(),
                        updatedAppointment.getTime(),
                        updatedAppointment.getDurationMinutes(),
                        3
                );

        if (resolvedSlot == null) {
            throw new SlotNotAvailableException(
                    "No available slot for this doctor");
        }

        //Default → BOOKED
        existingAppointment.setStatus("BOOKED");

        //If rescheduled
        if (!resolvedSlot.toLocalTime().equals(updatedAppointment.getTime()) ||
            !resolvedSlot.toLocalDate().equals(updatedAppointment.getDate())) {

            existingAppointment.setTime(resolvedSlot.toLocalTime());
            existingAppointment.setDate(resolvedSlot.toLocalDate());
            existingAppointment.setStatus("RESCHEDULED");

        } else {
            existingAppointment.setDate(updatedAppointment.getDate());
            existingAppointment.setTime(updatedAppointment.getTime());
        }

        existingAppointment.setPatient(patient);
        existingAppointment.setDoctor(doctor);

        return appointmentRepository.save(existingAppointment);
    }

    
    
    //DELETE Appointment
    @Transactional
    public void deleteAppointment(int id)
            throws AppointmentNotFoundException {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new AppointmentNotFoundException(
                                "Appointment not found with id " + id));
        appointmentRepository.delete(appointment);
    }

    
    
    //getAppointmentById
    public Appointment getAppointmentById(int id)
            throws AppointmentNotFoundException {

        return appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new AppointmentNotFoundException(
                                "Appointment not found with id " + id));
    }
    
    
    //getAllAppointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    
    
    //getAllAppointmentsPaginated
    public Page<Appointment> getAllAppointmentsWithPagination(Pageable pageable) {
        return appointmentRepository.findAll(pageable);
    }
    
    
    
    //Appointments by Doctor Id 
    public List<Appointment> getAppointmentsByDoctorId(int doctorId)
            throws DoctorNotFoundException {

        doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new DoctorNotFoundException(
                                "Doctor not found with id " + doctorId));

        //Fetch all appointments sorted by date and time
        return appointmentRepository
                .findByDoctor_IdOrderByDateAscTimeAsc(doctorId);
    }
    
    
    //Appointments by Doctor Id and Specific  Date
    public List<Appointment> getAppointmentsByDoctorAndDate(
            int doctorId, LocalDate date)
            throws DoctorNotFoundException {

        doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new DoctorNotFoundException(
                                "Doctor not found with id " + doctorId));

        return appointmentRepository
                .findByDoctor_IdAndDateOrderByTimeAsc(doctorId, date);
    }   
    
}





