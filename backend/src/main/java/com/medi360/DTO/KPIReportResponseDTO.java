package com.medi360.DTO;

import com.medi360.entities.KPIReport;

public class KPIReportResponseDTO {

    private KPIReport kpiReport;
    private int statusCode;
    private String message;

    public KPIReport getKpiReport() {
        return kpiReport;
    }

    public void setKpiReport(KPIReport kpiReport) {
        this.kpiReport = kpiReport;
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