package com.medi360.DTO;

import com.medi360.entities.AuditLog;

public class AuditlogResponseDTO {
	
	private AuditLog auditlog;
	private int statusCode;
	private String message;
	public AuditLog getAuditlog() {
		return auditlog;
	}
	public void setAuditlog(AuditLog auditlog) {
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
