package com.medi360.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.medi360.DTO.FinancialReportDTO;
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

	public Invoice updatePaymentStatus(int invoiceId, String paymentStatus, String paymentMode)
			throws InvoiceNotFoundException {

		Invoice invoice = invoiceRepository.findById(invoiceId)
				.orElseThrow(() -> new InvoiceNotFoundException("Invoice not found with id " + invoiceId));

		invoice.setPaymentStatus(paymentStatus);
		invoice.setPaymentMode(paymentMode);

		return invoiceRepository.save(invoice);
	}

	public Invoice processRefund(
	        int invoiceId,
	        double refundAmount)
	        throws InvoiceNotFoundException {

	    Invoice invoice = invoiceRepository.findById(invoiceId)
	            .orElseThrow(() ->
	                new InvoiceNotFoundException(
	                    "Invoice not found with id " + invoiceId));

	    if (refundAmount <= 0 || refundAmount > invoice.getAmount()) {
	        throw new IllegalArgumentException(
	            "Invalid refund amount");
	    }

	    invoice.setAdjustmentAmount(refundAmount);

	    if (refundAmount == invoice.getAmount()) {
	        invoice.setRefundStatus("FULL");
	        invoice.setPaymentStatus("REFUNDED");
	    } else {
	        invoice.setRefundStatus("PARTIAL");
	        invoice.setPaymentStatus("PARTIAL");
	    }

	    return invoiceRepository.save(invoice);
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

	public List<Invoice> getInvoicesByPatient(int patientId) throws InvoiceNotFoundException {

		List<Invoice> invoices = invoiceRepository.findByPatientPatientId(patientId);

		if (invoices.isEmpty()) {
			throw new InvoiceNotFoundException("No invoices found for patient " + patientId);
		}
		return invoices;
	}

	public List<Invoice> getInvoicesByPaymentStatus(String paymentStatus) throws InvoiceNotFoundException {

		List<Invoice> invoices = invoiceRepository.findByPaymentStatus(paymentStatus);

		if (invoices.isEmpty()) {
			throw new InvoiceNotFoundException("No invoices found with payment status " + paymentStatus);
		}

		return invoices;
	}
	
	public FinancialReportDTO getFinancialReport() {

	    Double totalBilled = invoiceRepository.getTotalBilledAmount();
	    Double totalPaid = invoiceRepository.getTotalPaidAmount();

	    long totalInvoices = invoiceRepository.getTotalInvoiceCount();
	    long paidInvoices = invoiceRepository.getPaidInvoiceCount();
	    long unpaidInvoices = invoiceRepository.getUnpaidInvoiceCount();

	    FinancialReportDTO report = new FinancialReportDTO();
	    report.setTotalBilledAmount(totalBilled != null ? totalBilled : 0);
	    report.setTotalPaidAmount(totalPaid != null ? totalPaid : 0);
	    report.setTotalPendingAmount(
	            (totalBilled != null ? totalBilled : 0)
	            - (totalPaid != null ? totalPaid : 0));

	    report.setTotalInvoices(totalInvoices);
	    report.setPaidInvoices(paidInvoices);
	    report.setUnpaidInvoices(unpaidInvoices);

	    return report;
	}
	
	public Page<Invoice> getAllInvoicesWithPagination(Pageable pageable) {
		return this.invoiceRepository.findAll(pageable);
	}

}
