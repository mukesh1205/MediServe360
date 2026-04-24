package com.medi360.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medi360.DTO.KPIReportDTO;
import com.medi360.DTO.KPIReportResponseDTO;
import com.medi360.entities.KPIReport;
import com.medi360.service.KPIReportService;

@RestController
@RequestMapping("/api")
public class KPIReportController {

    @Autowired
    private KPIReportService kpiReportService;

    @PostMapping("/addKPIReport")
    public ResponseEntity<KPIReportResponseDTO> addKPIReport(
            @RequestBody KPIReportDTO kpiReportDTO) {

        KPIReport report =
                kpiReportService.addKPIReport(kpiReportDTO.getKpiReport());

        KPIReportResponseDTO response = new KPIReportResponseDTO();
        response.setKpiId(report.getKpiId());
        response.setKpiReportScope(report.getKpiReportScope());
        response.setKpiMetrics(report.getKpiMetrics());
        response.setKpiGeneratedDate(report.getKpiGeneratedDate());
        response.setComplianceReportId(
                report.getComplianceReport() != null
                        ? report.getComplianceReport().getReportId()
                        : null
        );
        response.setStatusCode(201);
        response.setMessage("KPI report created successfully");

        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/fetchAllKPIReports")
    public List<KPIReport> fetchAllKPIReports() {
        return kpiReportService.getAllKPIReports();
    }
}


