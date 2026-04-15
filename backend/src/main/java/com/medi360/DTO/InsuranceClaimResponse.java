package com.medi360.DTO;

import com.medi360.entities.InsuranceClaim;

public class InsuranceClaimResponse {
	private InsuranceClaim insuranceClaim;
	private int statusCode;
	private String message;
	public InsuranceClaim getInsuranceClaim() {
		return insuranceClaim;
	}
	public void setInsuranceClaim(InsuranceClaim insuranceClaim) {
		this.insuranceClaim = insuranceClaim;
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
