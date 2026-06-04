package com.medi360.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medi360.db.AppointmentRepository;
import com.medi360.db.DoctorRepository;
import com.medi360.db.InsuranceClaimRepository;
import com.medi360.db.InvoiceRepository;
import com.medi360.db.PatientRepository;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private AppointmentRepository appointmentRepo;

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private InvoiceRepository invoiceRepo;

    @Autowired
    private InsuranceClaimRepository claimRepo;

    // ✅ RECEPTION DASHBOARD
    @GetMapping("/reception")
    public Map<String, Object> getReceptionStats() {

        Map<String, Object> data = new HashMap<>();

        data.put("totalPatients", patientRepo.count());
        data.put("appointmentsToday",
                appointmentRepo.countByDate(LocalDate.now()));
        data.put("totalDoctors", doctorRepo.count());
        data.put("completedToday",
                appointmentRepo.countByStatus("COMPLETED"));

        return data;
    }

    // ✅ FINANCE DASHBOARD
    @GetMapping("/finance")
    public Map<String, Object> getFinanceStats() {

        Map<String, Object> data = new HashMap<>();

        // ✅ Revenue
        data.put("totalRevenue", invoiceRepo.getTotalBilledAmount());

        // ✅ Invoices
        data.put("totalInvoices", invoiceRepo.count());
        data.put("paidInvoices",
                invoiceRepo.countByPaymentStatus("PAID"));

        // ✅ Pending claims
        data.put("pendingClaims",
                claimRepo.countByStatus("PENDING"));

        // ✅ Outstanding (unpaid invoices)
        Double outstanding = invoiceRepo
                .getTotalAmountByStatus("UNPAID");

        data.put("outstanding", outstanding);

        return data;
    }
}

