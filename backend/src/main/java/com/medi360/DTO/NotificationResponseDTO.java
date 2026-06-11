package com.medi360.DTO;

import java.time.LocalDateTime;

public class NotificationResponseDTO {
	
	private String category;
	private int patientId;
	private int doctorId;
	private int notificationID;
	private LocalDateTime createdDate;
	private String status;
	private String message;
	
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
	public int getNotificationID() {
		return notificationID;
	}
	public void setNotificationID(int notificationID) {
		this.notificationID = notificationID;
	}
	public LocalDateTime getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
