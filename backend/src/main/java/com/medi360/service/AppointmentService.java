/* package com.medi360.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.medi360.db.AppointmentRepository;
import com.medi360.db.DoctorRepository;
import com.medi360.db.PatientRepository;
import com.medi360.entities.Appointment;
import com.medi360.entities.Doctor;
import com.medi360.entities.Patient;

import org.springframework.transaction.annotation.Transactional;


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

    @Transactional
    public Appointment addAppointment(Appointment appointment) {

        Patient patient = patientRepository
                .findById(appointment.getPatient().getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository
                .findById(appointment.getDoctor().getId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);

        return appointmentRepository.save(appointment);
    }
    @Transactional
    public Appointment updateAppointment(Appointment updatedAppointment) {

        Appointment existingAppointment = appointmentRepository.findById(
                updatedAppointment.getId()
        ).orElseThrow(() -> new RuntimeException("Appointment not found"));

        Patient patient = patientRepository.findById(
                updatedAppointment.getPatient().getPatientId()
        ).orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository.findById(
                updatedAppointment.getDoctor().getId()
        ).orElseThrow(() -> new RuntimeException("Doctor not found"));

        existingAppointment.setDate(updatedAppointment.getDate());
        existingAppointment.setTime(updatedAppointment.getTime());
        existingAppointment.setStatus(updatedAppointment.getStatus());
        existingAppointment.setPatient(patient);
        existingAppointment.setDoctor(doctor);

        return appointmentRepository.save(existingAppointment);
    }

public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Transactional
    public void deleteAppointment(int id) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));

        appointmentRepository.delete(appointment);
    }
    @Transactional(readOnly = true)
    public Appointment getAppointmentById(int id) {

        return appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Appointment not found with id: " + id));
    }
    
	public Page<Appointment> getAllAppointmentsWithPagination (Pageable pageable){
		return appointmentRepository.findAll(pageable);
	}
}
*/

/* package com.medi360.service;

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

    // ✅ Doctor availability check (clean & small)
    private boolean isDoctorAvailable(Doctor doctor, LocalTime appointmentTime) {

        if (doctor.getAvailabilitySchedule() == null) {
            return false;
        }

        // Example: "10:00-14:00"
        String[] range = doctor.getAvailabilitySchedule().split("-");

        LocalTime startTime = LocalTime.parse(range[0]);
        LocalTime endTime = LocalTime.parse(range[1]);

        return !appointmentTime.isBefore(startTime)
            && !appointmentTime.isAfter(endTime);
    }

    // ✅ Add appointment with availability enforcement
    @Transactional
    public Appointment addAppointment(Appointment appointment) {

        Patient patient = patientRepository
                .findById(appointment.getPatient().getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository
                .findById(appointment.getDoctor().getId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        if (!isDoctorAvailable(doctor, appointment.getTime())) {
            throw new RuntimeException("Doctor is not available at this time");
        }

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);

        return appointmentRepository.save(appointment);
    }

    // ✅ Update / Reschedule appointment
    @Transactional
    public Appointment updateAppointment(Appointment updatedAppointment) {

        Appointment existingAppointment = appointmentRepository.findById(
                updatedAppointment.getId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Patient patient = patientRepository
                .findById(updatedAppointment.getPatient().getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository
                .findById(updatedAppointment.getDoctor().getId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        if (!isDoctorAvailable(doctor, updatedAppointment.getTime())) {
            throw new RuntimeException("Doctor is not available at this time");
        }

        existingAppointment.setDate(updatedAppointment.getDate());
        existingAppointment.setTime(updatedAppointment.getTime());
        existingAppointment.setStatus(updatedAppointment.getStatus());
        existingAppointment.setPatient(patient);
        existingAppointment.setDoctor(doctor);

        return appointmentRepository.save(existingAppointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Transactional
    public void deleteAppointment(int id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
        appointmentRepository.delete(appointment);
    }

    @Transactional(readOnly = true)
    public Appointment getAppointmentById(int id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
    }

    public Page<Appointment> getAllAppointmentsWithPagination(Pageable pageable) {
        return appointmentRepository.findAll(pageable);
    }
}


*/


/*


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

    //interval overlap check
    private boolean overlaps(
            LocalTime start1, LocalTime end1,
            LocalTime start2, LocalTime end2) {

        return start1.isBefore(end2) && start2.isBefore(end1);
    }

    // finding next available slot (variable length + next day)
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
                        candidate = existingEnd; // greedy jump
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

    @Transactional
    public Appointment addAppointment(Appointment appointment) {

        Patient patient = patientRepository
                .findById(appointment.getPatient().getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository
                .findById(appointment.getDoctor().getId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        if (!isDoctorAvailable(doctor, appointment.getTime())) {
            throw new RuntimeException("Doctor is not available at this time");
        }

        //variable length slot conflict + auto-reschedule
        LocalDateTime resolvedSlot =
                findNextAvailableSlot(
                        doctor,
                        appointment.getDate(),
                        appointment.getTime(),
                        appointment.getDurationMinutes(),
                        3 // next‑day search limit
                );

        if (resolvedSlot == null) {
            throw new RuntimeException("No available slot for this doctor");
        }

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

    @Transactional
    public Appointment updateAppointment(Appointment updatedAppointment) {
        Appointment existingAppointment =
                appointmentRepository.findById(updatedAppointment.getId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Patient patient = patientRepository
                .findById(updatedAppointment.getPatient().getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository
                .findById(updatedAppointment.getDoctor().getId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        if (!isDoctorAvailable(doctor, updatedAppointment.getTime())) {
            throw new RuntimeException("Doctor is not available at this time");
        }

        existingAppointment.setDate(updatedAppointment.getDate());
        existingAppointment.setTime(updatedAppointment.getTime());
        existingAppointment.setStatus(updatedAppointment.getStatus());
        existingAppointment.setPatient(patient);
        existingAppointment.setDoctor(doctor);

        return appointmentRepository.save(existingAppointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Transactional
    public void deleteAppointment(int id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Appointment not found with id: " + id));
        appointmentRepository.delete(appointment);
    }

    @Transactional(readOnly = true)
    public Appointment getAppointmentById(int id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Appointment not found with id: " + id));
    }

    public Page<Appointment> getAllAppointmentsWithPagination(Pageable pageable) {
        return appointmentRepository.findAll(pageable);
    }
}

*/



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

    // ✅ ADD appointment — throws declared (same as teammate)
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

    // ✅ UPDATE — throws declared
    @Transactional
    public Appointment updateAppointment(Appointment updatedAppointment)
            throws AppointmentNotFoundException,
                   PatientNotFoundException,
                   DoctorNotFoundException,
                   SlotNotAvailableException {

        Appointment existingAppointment =
                appointmentRepository.findById(updatedAppointment.getId())
                .orElseThrow(() ->
                        new AppointmentNotFoundException(
                                "Appointment not found with id "
                                + updatedAppointment.getId()));

        Patient patient = patientRepository
                .findById(updatedAppointment.getPatient().getPatientId())
                .orElseThrow(() ->
                        new PatientNotFoundException(
                                "Patient not found with id "
                                + updatedAppointment.getPatient().getPatientId()));

        Doctor doctor = doctorRepository
                .findById(updatedAppointment.getDoctor().getId())
                .orElseThrow(() ->
                        new DoctorNotFoundException(
                                "Doctor not found with id "
                                + updatedAppointment.getDoctor().getId()));

        if (!isDoctorAvailable(doctor, updatedAppointment.getTime())) {
            throw new SlotNotAvailableException(
                    "Doctor is not available at this time");
        }

        existingAppointment.setDate(updatedAppointment.getDate());
        existingAppointment.setTime(updatedAppointment.getTime());
        existingAppointment.setStatus(updatedAppointment.getStatus());
        existingAppointment.setPatient(patient);
        existingAppointment.setDoctor(doctor);

        return appointmentRepository.save(existingAppointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // ✅ DELETE — throws declared
    @Transactional
    public void deleteAppointment(int id)
            throws AppointmentNotFoundException {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new AppointmentNotFoundException(
                                "Appointment not found with id " + id));
        appointmentRepository.delete(appointment);
    }

    public Appointment getAppointmentById(int id)
            throws AppointmentNotFoundException {

        return appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new AppointmentNotFoundException(
                                "Appointment not found with id " + id));
    }

    public Page<Appointment> getAllAppointmentsWithPagination(Pageable pageable) {
        return appointmentRepository.findAll(pageable);
    }
}







