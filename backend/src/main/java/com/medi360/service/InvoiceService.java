package com.medi360.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medi360.db.InvoiceRepository;
import com.medi360.entities.Invoice;
import com.medi360.entities.Patient;

@Service
public class InvoiceService {
	
	@Autowired
	InvoiceRepository invoiceRepository;
	
	public Invoice addInvoice(Invoice invoice) {
		return this.invoiceRepository.save(invoice);
	}
	
	public Invoice updateInvoice(Invoice invoice) {
		return this.invoiceRepository.save(invoice);
	}
	
	public String deleteInvoice(Invoice invoice) {
		this.invoiceRepository.delete(invoice);
		return "successfully deleted invoice";
	}
	public List<Invoice> getAllInvoices() {
		return this.invoiceRepository.findAll();
	}
}
