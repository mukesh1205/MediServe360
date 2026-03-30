package com.medi360.PatientDoctorRegestration.Patient;

import java.util.List;

import com.medi360.AppointmentSchedule.Appointment.Appointment;
import com.medi360.BillingInsuranceManagement.IInsuranceClaim.InsuranceClaim;
import com.medi360.BillingInsuranceManagement.Invoice.Invoice;
import com.medi360.WardBedManagenment.Bed.Bed;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
	
	@OneToMany(mappedBy="doctor",cascade=CascadeType.ALL)
	private List<Appointment> appointments;
	
	@OneToOne
	private Bed bed;
	
	@OneToMany(mappedBy="patient",cascade=CascadeType.ALL)
	private List<Invoice> invoices;
	
	@OneToMany(mappedBy="patient",cascade=CascadeType.ALL)
	private List<InsuranceClaim> claims;
	public List<InsuranceClaim> getClaims() {
		return claims;
	}
	public void setClaims(List<InsuranceClaim> claims) {
		this.claims = claims;
	}
	public Bed getBed() {
		return bed;
	}
	public void setBed(Bed bed) {
		this.bed = bed;
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
