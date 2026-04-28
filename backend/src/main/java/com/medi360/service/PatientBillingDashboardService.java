package com.medi360.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.medi360.entities.Patient;
import com.medi360.entities.Invoice;

@Service
public class PatientBillingDashboardService {

   
    public long countActivePatients(List<Patient> patients) {
        return patients.stream()
                .filter(p -> "ACTIVE".equalsIgnoreCase(p.getPatientStatus()))
                .count();
    }

    public long countDischargedPatients(List<Patient> patients) {
        return patients.stream()
                .filter(p -> "DISCHARGED".equalsIgnoreCase(p.getPatientStatus()))
                .count();
    }

    
    public long countPaidInvoices(List<Invoice> invoices) {
        return invoices.stream()
                .filter(i -> "PAID".equalsIgnoreCase(i.getStatus()))
                .count();
    }

    public long countPendingInvoices(List<Invoice> invoices) {
        return invoices.stream()
                .filter(i -> "PENDING".equalsIgnoreCase(i.getStatus()))
                .count();
    }

    public double calculateBillingCompletionRate(
            long paidInvoices, long totalInvoices) {

        if (totalInvoices == 0) return 0.0;

        return (double) paidInvoices / totalInvoices * 100;
    }
}