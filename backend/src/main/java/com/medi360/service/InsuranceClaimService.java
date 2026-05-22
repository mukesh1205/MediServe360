package com.medi360.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.medi360.db.InsuranceClaimRepository;
import com.medi360.db.PatientRepository;
import com.medi360.entities.InsuranceClaim;
import com.medi360.entities.Patient;
import com.medi360.exception.InsuranceClaimNotFoundException;
import com.medi360.exception.PatientNotFoundException;

@Service
public class InsuranceClaimService {
	@Autowired
	InsuranceClaimRepository insuranceClaimRepository;
	@Autowired
	PatientRepository patientRepository;

	public InsuranceClaim addInsuranceClaim(InsuranceClaim insuranceClaim) throws PatientNotFoundException {
		int patientId = insuranceClaim.getPatient().getPatientId();
		Patient patient = patientRepository.findById(patientId)
				.orElseThrow(() -> new PatientNotFoundException("Patient not found with id " + patientId));
		insuranceClaim.setPatient(patient);
		return this.insuranceClaimRepository.save(insuranceClaim);
	}

	public InsuranceClaim updateInsuranceClaim(InsuranceClaim insuranceClaim)
			throws InsuranceClaimNotFoundException, PatientNotFoundException {

		if (!insuranceClaimRepository.existsById(insuranceClaim.getInsuranceClaimId())) {
			throw new InsuranceClaimNotFoundException(
					"Insurance claim not found with id " + insuranceClaim.getInsuranceClaimId());
		}

		int patientId = insuranceClaim.getPatient().getPatientId();
		Patient patient = patientRepository.findById(patientId)
				.orElseThrow(() -> new PatientNotFoundException("Patient not found with id " + patientId));

		insuranceClaim.setPatient(patient);

		return this.insuranceClaimRepository.save(insuranceClaim);
	}

	public InsuranceClaim updateClaimStatus(int claimId, String status) throws InsuranceClaimNotFoundException {

		InsuranceClaim claim = insuranceClaimRepository.findById(claimId)
				.orElseThrow(() -> new InsuranceClaimNotFoundException("Insurance claim not found with id " + claimId));

		claim.setStatus(status);

		return insuranceClaimRepository.save(claim);
	}

	public String deleteInsuranceClaim(int id) throws InsuranceClaimNotFoundException {

		if (!insuranceClaimRepository.existsById(id)) {
			throw new InsuranceClaimNotFoundException("Insurance claim not found with id " + id);
		}

		this.insuranceClaimRepository.deleteById(id);
		return "successfully deleted insuranceClaim";
	}

	public List<InsuranceClaim> getAllInsuranceClaims() {
		return this.insuranceClaimRepository.findAll();
	}

	public List<InsuranceClaim> getClaimsByStatus(String status) throws InsuranceClaimNotFoundException {

		List<InsuranceClaim> claims = insuranceClaimRepository.findByStatus(status);

		if (claims.isEmpty()) {
			throw new InsuranceClaimNotFoundException("No insurance claims found with status " + status);
		}

		return claims;
	}

	public Page<InsuranceClaim> getAllInsuranceClaimsWithPagination(Pageable pageable) {
		return this.insuranceClaimRepository.findAll(pageable);
	}

}
