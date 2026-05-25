package com.medi360.DTO;

import com.medi360.entities.Appointment;

public class AppointmentResponseDTO {
	
	private Appointment appointment;
	private int statusCode;
	private String message;
	private boolean wasRescheduled;
	
	public Appointment getAppointment() {
		return appointment;
	}
	public void setAppointment(Appointment appointment) {
		this.appointment = appointment;
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
	
	public boolean isWasRescheduled() {
	    return wasRescheduled;
	}

	public void setWasRescheduled(boolean wasRescheduled) {
	    this.wasRescheduled = wasRescheduled;
	}

}
