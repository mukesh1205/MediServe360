package com.medi360.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medi360.DTO.KPIReportDTO;
import com.medi360.DTO.KPIReportResponseDTO;
import com.medi360.entities.KPIReport;
import com.medi360.service.KPIReportService;

@RestController
@RequestMapping("/api/kpi-report")   // ✅ singular, matches Security.java and frontend
public class KPIReportController {

    @Autowired
    private KPIReportService kpiReportService;

    // ✅ POST - Add KPI Report
    @PostMapping("/addKPIReport")
    public ResponseEntity<KPIReportResponseDTO> addKPIReport(
            @RequestBody KPIReportDTO kpiReportDTO) {

        KPIReport report = kpiReportService.addKPIReport(kpiReportDTO.getKpiReport());

        return ResponseEntity.status(201).body(toDTO(report));
    }

    // ✅ GET - Fetch All (returns DTO to avoid lazy loading / infinite recursion)
    @GetMapping("/fetchAllKPIReports")
    public List<KPIReportResponseDTO> fetchAllKPIReports() {
        return kpiReportService.getAllKPIReports()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // ✅ GET - Paginated (returns DTO page)
    @GetMapping("/fetchAllKPIReports/paginated")
    public Page<KPIReportResponseDTO> fetchAllKPIReportsPaginated(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(defaultValue = "kpiId") String sortBy,
            @RequestParam(defaultValue = "true") boolean asc) {

        Sort sort = asc
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<KPIReport> kpiPage = kpiReportService.getKPIReportsWithPagination(pageable);

        List<KPIReportResponseDTO> dtoList = kpiPage.getContent()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, pageable, kpiPage.getTotalElements());
    }

    // ✅ Helper: convert KPIReport entity → KPIReportResponseDTO
    private KPIReportResponseDTO toDTO(KPIReport report) {
        KPIReportResponseDTO dto = new KPIReportResponseDTO();
        dto.setKpiId(report.getKpiId());
        dto.setKpiReportScope(report.getKpiReportScope());
        dto.setKpiMetrics(report.getKpiMetrics());
        dto.setKpiGeneratedDate(report.getKpiGeneratedDate());
        dto.setComplianceReportId(
                report.getComplianceReport() != null
                        ? report.getComplianceReport().getReportId()
                        : null
        );
        dto.setStatusCode(200);
        dto.setMessage("Success");
        return dto;
    }
}
