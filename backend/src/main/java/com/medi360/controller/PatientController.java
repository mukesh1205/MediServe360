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

import com.medi360.DTO.PatientDTO;
import com.medi360.DTO.PatientListResponseDTO;
import com.medi360.DTO.PatientResponseDTO;
import com.medi360.entities.Patient;
import com.medi360.exception.PatientNotFoundException;
import com.medi360.service.PatientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/patient")
public class PatientController {
	@Autowired
	PatientService patientService;

	@PostMapping("/addPatient")
	public ResponseEntity<PatientResponseDTO> f1( @Valid @RequestBody PatientDTO patientDTO) {
		Patient p = this.patientService.addPatient(patientDTO.getPatient());
		PatientResponseDTO dto = new PatientResponseDTO();
		dto.setPatient(p);
		dto.setStatusCode(201);
		dto.setMessage("Patient created successfully");

		return ResponseEntity.status(201).body(dto);
	}

	@GetMapping("/getPatientById/{id}")
	public ResponseEntity<PatientResponseDTO> getPatientById(@PathVariable int id) throws PatientNotFoundException {

		Patient patient = patientService.getPatientById(id);

		PatientResponseDTO dto = new PatientResponseDTO();
		dto.setPatient(patient);
		dto.setStatusCode(200);
		dto.setMessage("Patient record retrieved successfully");

		return ResponseEntity.ok(dto);
	}

	
	@GetMapping("/getPatientByName/{name}")
	public ResponseEntity<PatientListResponseDTO> getPatientByName(@PathVariable String name) throws PatientNotFoundException {

		List<Patient> patients = patientService.getPatientByName(name);

		PatientListResponseDTO dto = new PatientListResponseDTO();
		dto.setPatients(patients);
		dto.setStatusCode(200);
		dto.setMessage("Patient records retrieved successfully");

		return ResponseEntity.ok(dto);
	}

	@PutMapping("/updatePatient")
	public ResponseEntity<PatientResponseDTO> f2(  @Valid @RequestBody PatientDTO patientDTO) throws PatientNotFoundException {
		Patient p = this.patientService.updatePatient(patientDTO.getPatient());
		PatientResponseDTO dto = new PatientResponseDTO();
		dto.setPatient(p);
		dto.setStatusCode(200);
		dto.setMessage("Patient updated successfully");

		return ResponseEntity.status(200).body(dto);
	}

	@DeleteMapping("/deletePatient/{id}")
	public String f3(@PathVariable int id) throws PatientNotFoundException {
		return this.patientService.deletePatient(id);
	}

	@GetMapping("/fetchAllPatients")
	public List<Patient> f4() {
		return this.patientService.getAllPatients();
	}

	@GetMapping("/fetchAllPatientsPaginated")
	public Page<Patient> f6(@RequestParam(name = "pgno") int pgno, @RequestParam(name = "size") int size,
			@RequestParam(name = "sorting") String sorting, @RequestParam(name = "asc") boolean asc) {
		Sort sort = asc ? Sort.by(sorting).ascending() : Sort.by(sorting).descending();

		Pageable pageable = PageRequest.of(pgno, size, sort);
		return this.patientService.getAllPatientsWithPagination(pageable);
	}
}
