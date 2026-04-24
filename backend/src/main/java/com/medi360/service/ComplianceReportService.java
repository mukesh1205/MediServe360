package com.medi360.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.medi360.db.ComplianceReportRepository;
import com.medi360.entities.ComplianceReport;

@Service
public class ComplianceReportService {

    private final ComplianceReportRepository complianceReportRepository;

    
    public ComplianceReportService(ComplianceReportRepository complianceReportRepository) {
        this.complianceReportRepository = complianceReportRepository;
    }

 
    public ComplianceReport addComplianceReport(ComplianceReport report) {
        return complianceReportRepository.save(report);
    }

   
    public ComplianceReport updateComplianceReport(ComplianceReport report) {
        if (!complianceReportRepository.existsById(report.getReportId())) {
            throw new RuntimeException(
                "ComplianceReport not found with id: " + report.getReportId()
            );
        }
        return complianceReportRepository.save(report);
    }

  
    public ComplianceReport getComplianceReportById(int id) {
        return complianceReportRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("ComplianceReport not found with id: " + id));
    }


    public List<ComplianceReport> getAllComplianceReports() {
        return complianceReportRepository.findAll();
    }

 
    public String deleteComplianceReport(int id) {
        if (!complianceReportRepository.existsById(id)) {
            throw new RuntimeException(
                "ComplianceReport not found with id: " + id
            );
        }
        complianceReportRepository.deleteById(id);
        return "Compliance report deleted successfully";
    }
}
