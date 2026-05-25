package com.medi360.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medi360.DTO.InsuranceClaimDTO;
import com.medi360.DTO.InsuranceClaimResponse;
import com.medi360.entities.InsuranceClaim;
import com.medi360.exception.InsuranceClaimNotFoundException;
import com.medi360.exception.PatientNotFoundException;
import com.medi360.service.InsuranceClaimService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class InsuranceClaimController {
	@Autowired
	InsuranceClaimService insuranceClaimService;

	@PostMapping("/addInsuranceClaim")
	public ResponseEntity<InsuranceClaimResponse> f1(@Valid @RequestBody InsuranceClaimDTO insuranceClaimDTO)
			throws PatientNotFoundException {
		InsuranceClaim i = this.insuranceClaimService.addInsuranceClaim(insuranceClaimDTO.getInsuranceClaim());
		InsuranceClaimResponse dto = new InsuranceClaimResponse();
		dto.setInsuranceClaim(i);
		dto.setStatusCode(201);
		dto.setMessage("InsuranceClaim created successfully");

		return ResponseEntity.status(201).body(dto);
	}

	@GetMapping("/getInsuranceClaimById/{id}")
	public ResponseEntity<InsuranceClaimResponse> getInsuranceClaimById(@PathVariable int id) throws InsuranceClaimNotFoundException {

		InsuranceClaim insuranceClaim = insuranceClaimService.getInsuranceClaimById(id);

		InsuranceClaimResponse dto = new InsuranceClaimResponse();
		dto.setInsuranceClaim(insuranceClaim);
		dto.setStatusCode(200);
		dto.setMessage("InsuranceClaim record retrieved successfully");

		return ResponseEntity.ok(dto);
	}
	
	@PutMapping("/updateInsuranceClaim")
	public ResponseEntity<InsuranceClaimResponse> f2(@Valid @RequestBody InsuranceClaimDTO insuranceClaimDTO)
			throws InsuranceClaimNotFoundException, PatientNotFoundException {
		InsuranceClaim i = this.insuranceClaimService.updateInsuranceClaim(insuranceClaimDTO.getInsuranceClaim());
		InsuranceClaimResponse dto = new InsuranceClaimResponse();
		dto.setInsuranceClaim(i);
		dto.setStatusCode(200);
		dto.setMessage("InsuranceClaim updated successfully");

		return ResponseEntity.status(200).body(dto);
	}

	@PutMapping("/updateInsuranceClaimStatus/{claimId}")
	public ResponseEntity<InsuranceClaimResponse> updateClaimStatus(@PathVariable int claimId,
			@RequestParam String status) throws InsuranceClaimNotFoundException {

		InsuranceClaim claim = insuranceClaimService.updateClaimStatus(claimId, status);

		InsuranceClaimResponse dto = new InsuranceClaimResponse();
		dto.setInsuranceClaim(claim);
		dto.setStatusCode(200);
		dto.setMessage("Insurance claim status updated successfully");

		return ResponseEntity.ok(dto);
	}

	@DeleteMapping("/deleteInsuranceClaim/{id}")
	public String f3(@PathVariable int id) throws InsuranceClaimNotFoundException {
		return this.insuranceClaimService.deleteInsuranceClaim(id);
	}

	@GetMapping("/fetchAllInsuranceClaims")
	public List<InsuranceClaim> f4() {
		return this.insuranceClaimService.getAllInsuranceClaims();
	}

	@GetMapping("/getInsuranceClaimsByStatus/{status}")
	public List<InsuranceClaim> getClaimsByStatus(@PathVariable String status) throws InsuranceClaimNotFoundException {

		return insuranceClaimService.getClaimsByStatus(status);
	}

	@GetMapping("/fetchAllInsuranceClaimsPaginated")
	public Page<InsuranceClaim> f6(@RequestParam(name = "pgno") int pgno, @RequestParam(name = "size") int size,
			@RequestParam(name = "sorting") String sorting, @RequestParam(name = "asc") boolean asc) {
		Sort sort = asc ? Sort.by(sorting).ascending() : Sort.by(sorting).descending();

		Pageable pageable = PageRequest.of(pgno, size, sort);
		return this.insuranceClaimService.getAllInsuranceClaimsWithPagination(pageable);
	}
}
