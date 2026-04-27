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
    
	/* public Page<Appointment> getAllAppointmentsWithPagination (Pageable pageable){
		return appointmentRepository.findAll(pageable);
	} */
}














