package com.medi360.DTO;

public class NotificationDTO {
	
	private int patientId;
	private int doctorId;
	public int getDoctorID() {
		return doctorId;
	}
	public void setDoctorID(int doctorId) {
		this.doctorId = doctorId;
	}
	
	public int getPatientID() {
		return patientId;
	}
	public void setPatientID(int patientId) {
		this.patientId = patientId;
	}
	
	private String message;
	private String category;
	private String status;
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
