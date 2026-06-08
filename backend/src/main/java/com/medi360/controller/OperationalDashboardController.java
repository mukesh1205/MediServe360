package com.medi360.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medi360.DTO.OperationalDashboardDTO;
import com.medi360.entities.Bed;
import com.medi360.entities.Appointment;
import com.medi360.entities.InsuranceClaim;
import com.medi360.service.BedService;
import com.medi360.service.AppointmentService;
import com.medi360.service.InsuranceClaimService;
import com.medi360.service.OperationalDashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class OperationalDashboardController {

    @Autowired
    private BedService bedService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private InsuranceClaimService insuranceClaimService;

    @Autowired
    private OperationalDashboardService dashboardService;

    @GetMapping("/operational-kpis")
    public ResponseEntity<?> getOperationalKPIs() {
        try {
            List<Bed> beds = bedService.getAllBeds();
            List<Appointment> appointments = appointmentService.getAllAppointments();
            List<InsuranceClaim> claims = insuranceClaimService.getAllInsuranceClaims();

            OperationalDashboardDTO dto = new OperationalDashboardDTO();
            dto.setOccupancyRate(dashboardService.calculateOccupancyRate(beds));
            dto.setAppointmentFulfillmentRate(dashboardService.calculateAppointmentFulfillmentRate(appointments));
            dto.setClaimSuccessRate(dashboardService.calculateClaimSuccessRate(claims));
            dto.setStatusCode(200);
            dto.setMessage("Operational dashboard KPIs fetched successfully");

            return ResponseEntity.ok(dto);

        } catch (Exception e) {
            e.printStackTrace();   // logs to Spring Boot console for debugging

            Map<String, Object> error = new HashMap<>();
            error.put("errorMessage", e.getMessage());
            error.put("httpStatusCode", 500);
            return ResponseEntity.status(500).body(error);
        }
    }
}