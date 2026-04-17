package com.medi360.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medi360.db.InsuranceClaimRepository;
import com.medi360.entities.InsuranceClaim;
import com.medi360.entities.Invoice;

@Service
public class InsuranceClaimService {
	@Autowired
	InsuranceClaimRepository insuranceClaimRepository;
	
	public InsuranceClaim addInsuranceClaim(InsuranceClaim insuranceClaim) {
		return this.insuranceClaimRepository.save(insuranceClaim);
	}
	
	public InsuranceClaim updateInsuranceClaim(InsuranceClaim insuranceClaim) {
		return this.insuranceClaimRepository.save(insuranceClaim);
	}
	
	public String deleteInsuranceClaim(InsuranceClaim insuranceClaim) {
		this.insuranceClaimRepository.delete(insuranceClaim);
		return "successfully deleted insuranceClaim";
	}
	public List<InsuranceClaim> getAllInsuranceClaims() {
		return this.insuranceClaimRepository.findAll();
	}
}
