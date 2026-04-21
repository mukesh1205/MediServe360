package com.medi360.entities;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "invoices")

public class Invoice {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int invoiceId;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	@JsonIgnore
	private Patient patient;
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

	public Patient getPatientId() {
		return patient;
	}

	public void setPatientId(Patient patient) {
		this.patient = patient;
	}

	public Invoice(int invoiceId, double amount, Date invoiceDate, String status, Patient patient) {
		super();
		this.invoiceId = invoiceId;
		this.amount = amount;
		InvoiceDate = invoiceDate;
		this.status = status;
		this.patient = patient;
	}

	public Invoice() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
}
