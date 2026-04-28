package com.medi360.db;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.medi360.entities.Invoice;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
	List<Invoice> findByPatientPatientId(int patientId);

	List<Invoice> findByPaymentStatus(String paymentStatus);

	@Query("SELECT SUM(i.amount) FROM Invoice i")
	Double getTotalBilledAmount();

	@Query("SELECT SUM(i.amount) FROM Invoice i WHERE i.paymentStatus = 'PAID'")
	Double getTotalPaidAmount();

	@Query("SELECT COUNT(i) FROM Invoice i")
	long getTotalInvoiceCount();

	@Query("SELECT COUNT(i) FROM Invoice i WHERE i.paymentStatus = 'PAID'")
	long getPaidInvoiceCount();

	@Query("SELECT COUNT(i) FROM Invoice i WHERE i.paymentStatus = 'UNPAID'")
	long getUnpaidInvoiceCount();

}