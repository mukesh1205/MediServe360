package com.medi360.entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Invoice {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int invoiceId;
	
	@Column
	@ManyToOne
	@JoinColumn(name="patient_id")
	private int patientId;
	@Column
	private double amount;
	@Column
	private Date InvoiceDate;
	@Column
	private String status;
	

	public int getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(int invoiceId) {
		this.invoiceId = invoiceId;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Date getInvoiceDate() {
		return InvoiceDate;
	}

	public void setInvoiceDate(Date invoiceDate) {
		InvoiceDate = invoiceDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public Invoice(int invoiceId, double amount, Date invoiceDate, String status, int patientId) {
		super();
		this.invoiceId = invoiceId;
		this.amount = amount;
		InvoiceDate = invoiceDate;
		this.status = status;
		this.patientId = patientId;
	}

	public Invoice() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
}
