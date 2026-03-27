package com.medi360.PatientDoctorRegestration.Doctor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="doctors")
public class Doctor {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int DoctorId;
	private String doctorname;
	private String doctorDepartment;
	private String doctorAvailabilitSchedule;
	
	public int getDoctorId() {
		return DoctorId;
	}
	public void setDoctorId(int doctorId) {
		DoctorId = doctorId;
	}
	public String getDoctorname() {
		return doctorname;
	}
	public void setDoctorname(String doctorname) {
		this.doctorname = doctorname;
	}
	public String getDoctorDepartment() {
		return doctorDepartment;
	}
	public void setDoctorDepartment(String doctorDepartment) {
		this.doctorDepartment = doctorDepartment;
	}
	public String getDoctorAvailabilitSchedule() {
		return doctorAvailabilitSchedule;
	}
	public void setDoctorAvailabilitSchedule(String doctorAvailabilitSchedule) {
		this.doctorAvailabilitSchedule = doctorAvailabilitSchedule;
	}
	public Doctor(String doctorname, String doctorDepartment, String doctorAvailabilitSchedule) {
		super();
		this.doctorname = doctorname;
		this.doctorDepartment = doctorDepartment;
		this.doctorAvailabilitSchedule = doctorAvailabilitSchedule;
	}
	public Doctor() {
		super();
	}
	
	
	
}
