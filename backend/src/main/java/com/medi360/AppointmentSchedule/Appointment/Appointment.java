package com.medi360.AppointmentSchedule.Appointment;

import com.medi360.PatientDoctorRegestration.Doctor.Doctor;
import com.medi360.PatientDoctorRegestration.Patient.Patient;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="appointments")
public class Appointment {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int appointmentid;
	private String appointmentdate;
	private String appointmenttime;
	private String appointmentstatus;
	private Patient patient;
	private Doctor doctor;
	public int getAppointmentid() {
		return appointmentid;
	}
	public void setAppointmentid(int appointmentid) {
		this.appointmentid = appointmentid;
	}
	public String getAppointmentdate() {
		return appointmentdate;
	}
	public void setAppointmentdate(String appointmentdate) {
		this.appointmentdate = appointmentdate;
	}
	public String getAppointmenttime() {
		return appointmenttime;
	}
	public void setAppointmenttime(String appointmenttime) {
		this.appointmenttime = appointmenttime;
	}
	public String getAppointmentstatus() {
		return appointmentstatus;
	}
	public void setAppointmentstatus(String appointmentstatus) {
		this.appointmentstatus = appointmentstatus;
	}
	public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	public Doctor getDoctor() {
		return doctor;
	}
	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}
	public Appointment(String appointmentdate, String appointmenttime, String appointmentstatus, Patient patient,
			Doctor doctor) {
		super();
		this.appointmentdate = appointmentdate;
		this.appointmenttime = appointmenttime;
		this.appointmentstatus = appointmentstatus;
		this.patient = patient;
		this.doctor = doctor;
	}
	public Appointment() {
		super();
	}
	
	
}
