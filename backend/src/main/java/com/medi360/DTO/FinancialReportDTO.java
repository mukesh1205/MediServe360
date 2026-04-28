package com.medi360.DTO;

public class FinancialReportDTO {

    private double totalBilledAmount;
    private double totalPaidAmount;
    private double totalPendingAmount;
    private long totalInvoices;
    private long paidInvoices;
    private long unpaidInvoices;

    public double getTotalBilledAmount() {
        return totalBilledAmount;
    }

    public void setTotalBilledAmount(double totalBilledAmount) {
        this.totalBilledAmount = totalBilledAmount;
    }

    public double getTotalPaidAmount() {
        return totalPaidAmount;
    }

    public void setTotalPaidAmount(double totalPaidAmount) {
        this.totalPaidAmount = totalPaidAmount;
    }

    public double getTotalPendingAmount() {
        return totalPendingAmount;
    }

    public void setTotalPendingAmount(double totalPendingAmount) {
        this.totalPendingAmount = totalPendingAmount;
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

    public long getUnpaidInvoices() {
        return unpaidInvoices;
    }

    public void setUnpaidInvoices(long unpaidInvoices) {
        this.unpaidInvoices = unpaidInvoices;
    }
}