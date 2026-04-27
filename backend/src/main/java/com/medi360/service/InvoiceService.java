package com.medi360.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.medi360.db.InvoiceRepository;
import com.medi360.db.PatientRepository;
import com.medi360.entities.Invoice;
import com.medi360.entities.Patient;
import com.medi360.exception.InvoiceNotFoundException;
import com.medi360.exception.PatientNotFoundException;

@Service
public class InvoiceService {

	@Autowired
	InvoiceRepository invoiceRepository;
	@Autowired
	PatientRepository patientRepository;

	public Invoice addInvoice(Invoice invoice) throws PatientNotFoundException {
		int patientId = invoice.getPatient().getPatientId();
		Patient patient = patientRepository.findById(patientId)
				.orElseThrow(() -> new PatientNotFoundException("Patient not found with id " + patientId));
		invoice.setPatient(patient);
		return this.invoiceRepository.save(invoice);
	}

	public Invoice updateInvoice(Invoice invoice) throws InvoiceNotFoundException, PatientNotFoundException {

		if (!invoiceRepository.existsById(invoice.getInvoiceId())) {
			throw new InvoiceNotFoundException("Invoice not found with id " + invoice.getInvoiceId());
		}

		int patientId = invoice.getPatient().getPatientId();
		Patient patient = patientRepository.findById(patientId)
				.orElseThrow(() -> new PatientNotFoundException("Patient not found with id " + patientId));
		invoice.setPatient(patient);
		return this.invoiceRepository.save(invoice);
	}

	public String deleteInvoice(int id) throws InvoiceNotFoundException {

		if (!invoiceRepository.existsById(id)) {
			throw new InvoiceNotFoundException("Invoice not found with id " + id);
		}

		this.invoiceRepository.deleteById(id);
		return "successfully deleted invoice";
	}

	public List<Invoice> getAllInvoices() {
		return this.invoiceRepository.findAll();
	}

	public Page<Invoice> getAllInvoicesWithPagination(Pageable pageable) {
		return this.invoiceRepository.findAll(pageable);
	}
}
