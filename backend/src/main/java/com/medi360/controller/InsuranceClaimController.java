package com.medi360.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medi360.DTO.InsuranceClaimDTO;
import com.medi360.DTO.InsuranceClaimResponse;
import com.medi360.entities.InsuranceClaim;
import com.medi360.service.InsuranceClaimService;

@RestController
@RequestMapping("/api")
public class InsuranceClaimController {
	@Autowired
	InsuranceClaimService insuranceClaimService;
	
	@PostMapping("/addInsuranceClaim")
	public ResponseEntity<InsuranceClaimResponse> f1(@RequestBody InsuranceClaimDTO insuranceClaimDTO) {
		InsuranceClaim i=this.insuranceClaimService.addInsuranceClaim(insuranceClaimDTO.getInsuranceClaim());
		InsuranceClaimResponse dto=new InsuranceClaimResponse();
		dto.setInsuranceClaim(i);
		dto.setStatusCode(201);
		dto.setMessage("InsuranceClaim created successfully");
		
		return ResponseEntity.status(201).body(dto);
	}
	
	@PutMapping("/updateInsuranceClaim")
	public ResponseEntity<InsuranceClaimResponse> f2(@RequestBody InsuranceClaimDTO insuranceClaimDTO){
		InsuranceClaim i=this.insuranceClaimService.updateInsuranceClaim(insuranceClaimDTO.getInsuranceClaim());
		InsuranceClaimResponse dto=new InsuranceClaimResponse();
		dto.setInsuranceClaim(i);
		dto.setStatusCode(201);
		dto.setMessage("InsuranceClaim created successfully");
		
		return ResponseEntity.status(201).body(dto);
	}
	@DeleteMapping("/deleteInsuranceClaim/{id}")
	public String f3(@PathVariable int id) {
		return this.insuranceClaimService.deleteInsuranceClaim(id);
	}
	
	@GetMapping("/fetchAllInsuranceClaims")
	public List<InsuranceClaim> f4(){
		return this.insuranceClaimService.getAllInsuranceClaims();
	}
}
