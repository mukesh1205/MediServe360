package com.medi360.entities;

import jakarta.persistence.Column;
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
	@Column
	@ManyToOne
	@JoinColumn(name="patient_id")
	private int patientId;
	@Column
	private String policynumber;
	@Column
	private double amount;
	@Column
	private String status;
	public int getClaimId() {
		return claimId;
	}
	public void setClaimId(int claimId) {
		this.claimId = claimId;
	}
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
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
	public InsuranceClaim(int claimId, int patientId, String policynumber, double amount, String status) {
		super();
		this.claimId = claimId;
		this.patientId = patientId;
		this.policynumber = policynumber;
		this.amount = amount;
		this.status = status;
	}
	public InsuranceClaim() {
		super();
		// TODO Auto-generated constructor stub
	}
		
	
	
}
