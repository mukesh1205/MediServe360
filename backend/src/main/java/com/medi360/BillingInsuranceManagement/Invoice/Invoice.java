package com.medi360.BillingInsuranceManagement.Invoice;

import java.util.Date;

import com.medi360.PatientDoctorRegestration.Patient.Patient;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Invoice {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int invoiceId;
	private double amount;
	private Date InvoiceDate;
	private String status;
	
	private Patient patient;

	public Invoice() {
		super();
	}

	public Invoice(double amount, Date invoiceDate, String status, Patient patient) {
		super();
		this.amount = amount;
		InvoiceDate = invoiceDate;
		this.status = status;
		this.patient = patient;
	}

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

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	
}
