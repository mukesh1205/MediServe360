package com.medi360.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medi360.db.InsuranceClaimRepository;
import com.medi360.db.PatientRepository;
import com.medi360.entities.InsuranceClaim;
import com.medi360.entities.Patient;

@Service
public class InsuranceClaimService {
	@Autowired
	InsuranceClaimRepository insuranceClaimRepository;
	@Autowired
	PatientRepository patientRepository;
	public InsuranceClaim addInsuranceClaim(InsuranceClaim insuranceClaim) {
		int patientId=insuranceClaim.getPatient().getPatientId();
		Patient patient=patientRepository.findById(patientId).orElseThrow(()->new RuntimeException("Patient not found"));
		insuranceClaim.setPatient(patient);
		return this.insuranceClaimRepository.save(insuranceClaim);
	}
	
	public InsuranceClaim updateInsuranceClaim(InsuranceClaim insuranceClaim) {
		return this.insuranceClaimRepository.save(insuranceClaim);
	}
	
	public String deleteInsuranceClaim(int id) {
		this.insuranceClaimRepository.deleteById(id);
		return "successfully deleted insuranceClaim";
	}
	public List<InsuranceClaim> getAllInsuranceClaims() {
		return this.insuranceClaimRepository.findAll();
	}
}
