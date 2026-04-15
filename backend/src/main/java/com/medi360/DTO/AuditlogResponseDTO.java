package com.medi360.DTO;

import com.medi360.entities.Auditlog;

public class AuditlogResponseDTO {
	private Auditlog auditlog;
	private int statusCode;
	private String message;
	public Auditlog getAuditlog() {
		return auditlog;
	}
	public void setAuditlog(Auditlog auditlog) {
		this.auditlog = auditlog;
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
