package com.medi360.PatientDoctorRegestration.Patient;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="patients")
public class Patient {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int PatientID;
	private String patientname;
	private String patientDOB;
	private String patientgender;
	private String patientPhoneNumber;
	@Column(length=100)
	private String patientMedicalHistory;
	private String patientStatus;
	public int getPatientID() {
		return PatientID;
	}
	public void setPatientID(int patientID) {
		PatientID = patientID;
	}
	public String getPatientname() {
		return patientname;
	}
	public void setPatientname(String patientname) {
		this.patientname = patientname;
	}
	public String getPatientDOB() {
		return patientDOB;
	}
	public void setPatientDOB(String patientDOB) {
		this.patientDOB = patientDOB;
	}
	public String getPatientgender() {
		return patientgender;
	}
	public void setPatientgender(String patientgender) {
		this.patientgender = patientgender;
	}
	public String getPatientPhoneNumber() {
		return patientPhoneNumber;
	}
	public void setPatientPhoneNumber(String patientPhoneNumber) {
		this.patientPhoneNumber = patientPhoneNumber;
	}
	public String getPatientMedicalHistory() {
		return patientMedicalHistory;
	}
	public void setPatientMedicalHistory(String patientMedicalHistory) {
		this.patientMedicalHistory = patientMedicalHistory;
	}
	public Patient(String patientname, String patientDOB, String patientgender, String patientPhoneNumber,
			String patientMedicalHistory, String patientStatus) {
		super();
		this.patientname = patientname;
		this.patientDOB = patientDOB;
		this.patientgender = patientgender;
		this.patientPhoneNumber = patientPhoneNumber;
		this.patientMedicalHistory = patientMedicalHistory;
		this.patientStatus = patientStatus;
	}
	public Patient() {
		super();
	}
	public String getPatientStatus() {
		return patientStatus;
	}
	public void setPatientStatus(String patientStatus) {
		this.patientStatus = patientStatus;
	}
	
	
	
}
