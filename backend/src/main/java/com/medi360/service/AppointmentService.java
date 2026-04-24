package com.medi360.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.medi360.db.AppointmentRepository;
import com.medi360.entities.Appointment;

@Service
public class AppointmentService {
	
	private final AppointmentRepository appointmentRepository;
	
	public AppointmentService(AppointmentRepository appointmentRepository) {
		this.appointmentRepository = appointmentRepository;
	}
	
	
	public Appointment addAppointment(Appointment appointment) {
		return appointmentRepository.save(appointment);	
	}
	
	public Appointment updateAppointment(Appointment appointment) {
		return appointmentRepository.save(appointment);
	}
	
	public void deleteAppointment(int appointmentId) {
		   appointmentRepository.deleteById(appointmentId);
	}
	
    public Appointment getAppointmentById(int id) {
		return appointmentRepository.findById(id).get();
	}
    
	public List<Appointment> getAllAppointments() {
		return appointmentRepository.findAll();	
	}

}









