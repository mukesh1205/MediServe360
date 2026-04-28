package com.medi360.DTO;

public class OperationalDashboardDTO {

    private double occupancyRate;
    private double appointmentFulfillmentRate;
    private double claimSuccessRate;

    private int statusCode;
    private String message;

    public double getOccupancyRate() {
        return occupancyRate;
    }

    public void setOccupancyRate(double occupancyRate) {
        this.occupancyRate = occupancyRate;
    }

    public double getAppointmentFulfillmentRate() {
        return appointmentFulfillmentRate;
    }

    public void setAppointmentFulfillmentRate(double appointmentFulfillmentRate) {
        this.appointmentFulfillmentRate = appointmentFulfillmentRate;
    }

    public double getClaimSuccessRate() {
        return claimSuccessRate;
    }

    public void setClaimSuccessRate(double claimSuccessRate) {
        this.claimSuccessRate = claimSuccessRate;
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