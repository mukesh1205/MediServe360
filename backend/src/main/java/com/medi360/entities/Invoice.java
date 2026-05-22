package com.medi360.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

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

@Entity
@Table(name = "Invoice")
public class Invoice {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int invoiceId;

	@ManyToOne
	@JoinColumn(name = "patient_id", nullable = false)
	@NotNull
	private Patient patient;

	@Column
	@Positive
	private double amount;

	@Column
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@NotNull
	private LocalDate invoiceDate;

	@Column
	@NotBlank
	private String paymentStatus;

	@NotBlank
	private String paymentMode;

	@Positive
	private double adjustmentAmount; 

	@NotBlank
	private String refundStatus;

	public Invoice(@NotNull Patient patient, @Positive double amount, @NotNull LocalDate invoiceDate,
			@NotBlank String paymentStatus, @NotBlank String paymentMode, @Positive double adjustmentAmount,
			@NotBlank String refundStatus) {
		super();
		this.patient = patient;
		this.amount = amount;
		this.invoiceDate = invoiceDate;
		this.paymentStatus = paymentStatus;
		this.paymentMode = paymentMode;
		this.adjustmentAmount = adjustmentAmount;
		this.refundStatus = refundStatus;
	}

	public double getAdjustmentAmount() {
		return adjustmentAmount;
	}

	public void setAdjustmentAmount(double adjustmentAmount) {
		this.adjustmentAmount = adjustmentAmount;
	}

	public String getRefundStatus() {
		return refundStatus;
	}

	public void setRefundStatus(String refundStatus) {
		this.refundStatus = refundStatus;
	}

	public int getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(Integer invoiceId) {
		this.invoiceId = invoiceId;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public LocalDate getInvoiceDate() {
		return invoiceDate;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public void setInvoiceDate(LocalDate invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	
	public Invoice() {
		super();
		// TODO Auto-generated constructor stub
	}

}
