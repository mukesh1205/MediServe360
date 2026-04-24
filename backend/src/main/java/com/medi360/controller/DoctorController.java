package com.medi360.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medi360.DTO.DoctorDTO;
import com.medi360.DTO.DoctorResponseDTO;
import com.medi360.entities.Doctor;
import com.medi360.service.DoctorService;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
	
	private final DoctorService doctorService;
	
	public DoctorController(DoctorService doctorService) {
		this.doctorService = doctorService;
	}
	
	@PostMapping("/add")
	public ResponseEntity <DoctorResponseDTO> addDoctor(@RequestBody DoctorDTO doctorDTO) {
		
		Doctor doctor = doctorService.addDoctor(doctorDTO.getDoctor());
		DoctorResponseDTO dto = new DoctorResponseDTO();
		dto.setDoctor(doctor);
		dto.setStatusCode(201);
		dto.setMessage("Doctor added successfully");
		
		return ResponseEntity.status(201).body(dto);
		
	}
	
	@PutMapping("/update")
	public ResponseEntity <DoctorResponseDTO> updateDoctor(@RequestBody DoctorDTO doctorDTO) {
		Doctor doctor = doctorService.updateDoctor(doctorDTO.getDoctor());
		DoctorResponseDTO dto = new DoctorResponseDTO();
		dto.setDoctor(doctor);
		dto.setStatusCode(200);
		dto.setMessage("Doctor updated successfully");
		
		return ResponseEntity.ok(dto);
		
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteDoctor(@PathVariable int id) {
		
		doctorService.deleteDoctor(id);
		return ResponseEntity.ok("Doctor deleted successfully");
		
	}
	
	@GetMapping("/get/{id}")
	public Doctor getDoctorById(@PathVariable int id) {
		return doctorService.getDoctorById(id);
	}
	
	@GetMapping("/getAll")
	public List <Doctor> getAllDoctors() {
		return doctorService.getAllDoctors();
	}
	
}






