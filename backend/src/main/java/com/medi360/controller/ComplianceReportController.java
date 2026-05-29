package com.medi360.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medi360.DTO.ComplianceReportDTO;
import com.medi360.DTO.ComplianceReportResponseDTO;
import com.medi360.entities.ComplianceReport;
import com.medi360.service.ComplianceReportService;

@RestController
@RequestMapping("/api/compliance-reports")
public class ComplianceReportController {

    @Autowired
    private ComplianceReportService complianceReportService;

    
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

    @DeleteMapping("/deleteComplianceReport/{id}")
    public String deleteComplianceReport(@PathVariable int id) {
        return complianceReportService.deleteComplianceReport(id);
    }

    @GetMapping("/fetchAllComplianceReports")
    public List<ComplianceReport> fetchAllComplianceReports() {
        return complianceReportService.getAllComplianceReports();
    }
    
    @GetMapping("/compliance-reports")
    public Page<ComplianceReport> getAllComplianceReportsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size,
            @RequestParam(defaultValue = "reportId") String sortBy,
            @RequestParam(defaultValue = "true") boolean asc) {

        Sort sort = asc
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return complianceReportService.getComplianceReportsWithPagination(pageable);
    }
}

