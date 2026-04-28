package com.medi360.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medi360.DTO.PatientBillingDashboardDTO;
import com.medi360.entities.Patient;
import com.medi360.entities.Invoice;
import com.medi360.service.PatientService;
import com.medi360.service.InvoiceService;
import com.medi360.service.PatientBillingDashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class PatientBillingDashboardController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private PatientBillingDashboardService dashboardService;

    @GetMapping("/patient-billing")
    public ResponseEntity<PatientBillingDashboardDTO> getPatientBillingDashboard() {

        List<Patient> patients = patientService.getAllPatients();
        List<Invoice> invoices = invoiceService.getAllInvoices();

        long paidInvoices =
                dashboardService.countPaidInvoices(invoices);

        PatientBillingDashboardDTO dto = new PatientBillingDashboardDTO();

        dto.setTotalPatients(patients.size());
        dto.setActivePatients(
                dashboardService.countActivePatients(patients));
        dto.setDischargedPatients(
                dashboardService.countDischargedPatients(patients));

        dto.setTotalInvoices(invoices.size());
        dto.setPaidInvoices(paidInvoices);
        dto.setPendingInvoices(
                dashboardService.countPendingInvoices(invoices));

        dto.setBillingCompletionRate(
                dashboardService.calculateBillingCompletionRate(
                        paidInvoices, invoices.size()));

        dto.setStatusCode(200);
        dto.setMessage("Patient flow and billing dashboard data fetched successfully");

        return ResponseEntity.ok(dto);
    }
}