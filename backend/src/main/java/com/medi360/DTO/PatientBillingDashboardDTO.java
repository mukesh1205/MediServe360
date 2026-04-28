package com.medi360.DTO;

public class PatientBillingDashboardDTO {

    
    private long totalPatients;
    private long activePatients;
    private long dischargedPatients;

   
    private long totalInvoices;
    private long paidInvoices;
    private long pendingInvoices;
    private double billingCompletionRate;

    private int statusCode;
    private String message;

   

    public long getTotalPatients() {
        return totalPatients;
    }

    public void setTotalPatients(long totalPatients) {
        this.totalPatients = totalPatients;
    }

    public long getActivePatients() {
        return activePatients;
    }

    public void setActivePatients(long activePatients) {
        this.activePatients = activePatients;
    }

    public long getDischargedPatients() {
        return dischargedPatients;
    }

    public void setDischargedPatients(long dischargedPatients) {
        this.dischargedPatients = dischargedPatients;
    }

    public long getTotalInvoices() {
        return totalInvoices;
    }

    public void setTotalInvoices(long totalInvoices) {
        this.totalInvoices = totalInvoices;
    }

    public long getPaidInvoices() {
        return paidInvoices;
    }

    public void setPaidInvoices(long paidInvoices) {
        this.paidInvoices = paidInvoices;
    }

    public long getPendingInvoices() {
        return pendingInvoices;
    }

    public void setPendingInvoices(long pendingInvoices) {
        this.pendingInvoices = pendingInvoices;
    }

    public double getBillingCompletionRate() {
        return billingCompletionRate;
    }

    public void setBillingCompletionRate(double billingCompletionRate) {
        this.billingCompletionRate = billingCompletionRate;
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