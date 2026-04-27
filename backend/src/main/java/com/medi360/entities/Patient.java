
package com.medi360.entities;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import jakarta.persistence.Table;

@Entity
@Table(name="Patient")
public class Patient {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int patientId;
	@Column
	private String patientName;
	@Column
	private Date patientDOB;
	@Column
	private String patientGender;
	@Column
	private String patientPhoneNumber;
	@Column(length=100)
	private String patientMedicalHistory;
	@Column
	private String patientStatus;
	
	@OneToMany(mappedBy="patient",cascade=CascadeType.ALL)
	@JsonIgnore
	private List<Appointment> appointments;
	
	@OneToMany(mappedBy="patient",cascade=CascadeType.ALL)
	@JsonIgnore
	private List<Invoice> invoices;
	
	@OneToMany(mappedBy="patient",cascade=CascadeType.ALL)
	@JsonIgnore
	private List<InsuranceClaim> claims;
	public List<InsuranceClaim> getClaims() {
		return claims;
	}
	public void setClaims(List<InsuranceClaim> claims) {
		this.claims = claims;
	}
	
	public List<Invoice> getInvoices() {
		return invoices;
	}
	public void setInvoices(List<Invoice> invoices) {
		this.invoices = invoices;
	}
	public List<Appointment> getAppointments() {
		return appointments;
	}
	public void setAppointments(List<Appointment> appointments) {
		this.appointments = appointments;
	}
	
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public Date getPatientDOB() {
		return patientDOB;
	}
	public void setPatientDOB(Date patientDOB) {
		this.patientDOB = patientDOB;
	}
	public String getPatientGender() {
		return patientGender;
	}
	public void setPatientGender(String patientGender) {
		this.patientGender = patientGender;
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
	public Patient(String patientname, Date patientDOB, String patientgender, String patientPhoneNumber,
			String patientMedicalHistory, String patientStatus) {
		super();
		this.patientName = patientname;
		this.patientDOB = patientDOB;
		this.patientGender = patientgender;
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
