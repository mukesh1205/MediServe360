package com.medi360.DTO;

import com.medi360.entities.ComplianceReport;

public class CompilanceReportResponseDTO {

    private ComplianceReport complianceReport;
    private int statusCode;
    private String message;

    public ComplianceReport getComplianceReport() {
        return complianceReport;
    }

    public void setComplianceReport(ComplianceReport complianceReport) {
        this.complianceReport = complianceReport;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
