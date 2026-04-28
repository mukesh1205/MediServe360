package com.medi360.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "InsuranceClaim")
public class InsuranceClaim {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int insuranceClaimId;

	@ManyToOne
	@JoinColumn(name = "patient_id", nullable = false)
	@NotNull
	private Patient patient;

	@Column
	@NotBlank
	@Size(max = 50)
	private String policyNumber;

	@Column
	@Positive
	private double amount;

	@Column
	@NotBlank
	private String status;

	public int getInsuranceClaimId() {
		return insuranceClaimId;
	}

	public void setInsuranceClaimId(int claimId) {
		this.insuranceClaimId = claimId;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public String getPolicyNumber() {
		return policyNumber;
	}

	public void setPolicyNumber(String policynumber) {
		this.policyNumber = policynumber;
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

	public InsuranceClaim(Patient patient, String policyNumber, double amount, String status) {
		super();

		this.patient = patient;
		this.policyNumber = policyNumber;
		this.amount = amount;
		this.status = status;
	}

	public InsuranceClaim() {
		super();
		// TODO Auto-generated constructor stub
	}

}
