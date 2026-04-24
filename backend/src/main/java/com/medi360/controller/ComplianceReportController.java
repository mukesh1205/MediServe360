package com.medi360.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medi360.DTO.ComplianceReportDTO;
import com.medi360.DTO.ComplianceReportResponseDTO;
import com.medi360.entities.ComplianceReport;
import com.medi360.service.ComplianceReportService;

@RestController
@RequestMapping("/api")
public class ComplianceReportController {

    @Autowired
    private ComplianceReportService complianceReportService;

    // ✅ Add Compliance Report
    @PostMapping("/addComplianceReport")
    public ResponseEntity<ComplianceReportResponseDTO> addComplianceReport(
            @RequestBody ComplianceReportDTO complianceReportDTO) {

        ComplianceReport report =
                complianceReportService.addComplianceReport(
                        complianceReportDTO.getComplianceReport());

        ComplianceReportResponseDTO response = new ComplianceReportResponseDTO();
        response.setReportId(report.getReportId());
        response.setReportScope(report.getReportScope());
        response.setReportMetrics(report.getReportMetrics());
        response.setReportGeneratedDate(report.getReportGeneratedDate());

        // ✅ Handle One-to-Many correctly
        if (report.getKpiReports() != null) {
            response.setKpiReportIds(
                    report.getKpiReports()
                          .stream()
                          .map(kpi -> kpi.getKpiId())
                          .collect(Collectors.toList())
            );
        }

        response.setStatusCode(201);
        response.setMessage("Compliance report created successfully");

        return ResponseEntity.status(201).body(response);
    }

    // ✅ Update Compliance Report
    @PutMapping("/updateComplianceReport")
    public ResponseEntity<ComplianceReportResponseDTO> updateComplianceReport(
            @RequestBody ComplianceReportDTO complianceReportDTO) {

        ComplianceReport report =
                complianceReportService.updateComplianceReport(
                        complianceReportDTO.getComplianceReport());

        ComplianceReportResponseDTO response = new ComplianceReportResponseDTO();
        response.setReportId(report.getReportId());
        response.setReportScope(report.getReportScope());
        response.setReportMetrics(report.getReportMetrics());
        response.setReportGeneratedDate(report.getReportGeneratedDate());

        // ✅ Handle One-to-Many correctly
        if (report.getKpiReports() != null) {
            response.setKpiReportIds(
                    report.getKpiReports()
                          .stream()
                          .map(kpi -> kpi.getKpiId())
                          .collect(Collectors.toList())
            );
        }

        response.setStatusCode(200);
        response.setMessage("Compliance report updated successfully");

        return ResponseEntity.ok(response);
    }

    // ✅ Delete Compliance Report
    @DeleteMapping("/deleteComplianceReport/{id}")
    public String deleteComplianceReport(@PathVariable int id) {
        return complianceReportService.deleteComplianceReport(id);
    }

    // ✅ Fetch All Compliance Reports
    @GetMapping("/fetchAllComplianceReports")
    public List<ComplianceReport> fetchAllComplianceReports() {
        return complianceReportService.getAllComplianceReports();
    }
}

