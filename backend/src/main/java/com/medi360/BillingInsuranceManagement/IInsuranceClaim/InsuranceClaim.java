package com.medi360.BillingInsuranceManagement.IInsuranceClaim;

import com.medi360.PatientDoctorRegestration.Patient.Patient;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class InsuranceClaim {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int claimId;
	@ManyToOne
	@JoinColumn(name="patient_id")
	private Patient patient;
	private String policynumber;
	private double amount;
	private String status;
	
	public int getClaimId() {
		return claimId;
	}
	public void setClaimId(int claimId) {
		this.claimId = claimId;
	}
	public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	public String getPolicynumber() {
		return policynumber;
	}
	public void setPolicynumber(String policynumber) {
		this.policynumber = policynumber;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public InsuranceClaim(Patient patient, String policynumber, double amount, String status) {
		super();
		this.patient = patient;
		this.policynumber = policynumber;
		this.amount = amount;
		this.status = status;
	}
	public InsuranceClaim() {
		super();
	}
	
	
	
}
