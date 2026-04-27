package com.medi360.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.model.Employee;
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

        // ✅ Fetch managed Patient
        Patient patient = patientRepository
                .findById(appointment.getPatient().getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        // ✅ Fetch managed Doctor
        Doctor doctor = doctorRepository
                .findById(appointment.getDoctor().getId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // ✅ Attach managed entities
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);

        return appointmentRepository.save(appointment);
    }
    @Transactional
    public Appointment updateAppointment(Appointment updatedAppointment) {

        // ✅ 1. Fetch existing appointment
        Appointment existingAppointment = appointmentRepository.findById(
                updatedAppointment.getId()
        ).orElseThrow(() -> new RuntimeException("Appointment not found"));

        // ✅ 2. Fetch managed patient
        Patient patient = patientRepository.findById(
                updatedAppointment.getPatient().getPatientId()
        ).orElseThrow(() -> new RuntimeException("Patient not found"));

        // ✅ 3. Fetch managed doctor
        Doctor doctor = doctorRepository.findById(
                updatedAppointment.getDoctor().getId()
        ).orElseThrow(() -> new RuntimeException("Doctor not found"));

        // ✅ 4. Update fields
        existingAppointment.setDate(updatedAppointment.getDate());
        existingAppointment.setTime(updatedAppointment.getTime());
        existingAppointment.setStatus(updatedAppointment.getStatus());
        existingAppointment.setPatient(patient);
        existingAppointment.setDoctor(doctor);

        // ✅ 5. Save managed entity
        return appointmentRepository.save(existingAppointment);
    }

public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // ✅ DELETE APPOINTMENT BY ID
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
    
	/* public Page<Appointment> getAllAppointmentsWithPagination (Pageable pageable){
		return appointmentRepository.findAll(pageable);
	} */
}














