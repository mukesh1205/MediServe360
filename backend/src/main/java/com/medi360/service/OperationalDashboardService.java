package com.medi360.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.medi360.entities.Bed;
import com.medi360.entities.Appointment;
import com.medi360.entities.InsuranceClaim;

@Service
public class OperationalDashboardService {

    /* Occupancy Rate */
    public double calculateOccupancyRate(List<Bed> beds) {
        if (beds.isEmpty()) return 0.0;

        long occupiedBeds = beds.stream()
                .filter(bed -> "OCCUPIED".equalsIgnoreCase(bed.getBedStatus()))
                .count();

        return (double) occupiedBeds / beds.size() * 100;
    }

    /* Appointment Fulfillment Rate */
    public double calculateAppointmentFulfillmentRate(List<Appointment> appointments) {
        if (appointments.isEmpty()) return 0.0;

        long completedAppointments = appointments.stream()
                .filter(a -> "COMPLETED".equalsIgnoreCase(a.getStatus()))
                .count();

        return (double) completedAppointments / appointments.size() * 100;
    }

    /* Claim Success Rate */
    public double calculateClaimSuccessRate(List<InsuranceClaim> claims) {
        if (claims.isEmpty()) return 0.0;

        long successfulClaims = claims.stream()
                .filter(c -> 
                    "APPROVED".equalsIgnoreCase(c.getStatus()) ||
                    "PAID".equalsIgnoreCase(c.getStatus())
                )
                .count();

        return (double) successfulClaims / claims.size() * 100;
    }
}