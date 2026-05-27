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

import com.medi360.DTO.BedDTO;
import com.medi360.DTO.BedResponseDTO;
import com.medi360.entities.Bed;
import com.medi360.exception.BedNotFoundException;
import com.medi360.service.BedService;

@RestController
@RequestMapping("/api/beds")
public class BedController {
	@Autowired
	private BedService bedService;

	@PostMapping("/create")

	public ResponseEntity<BedResponseDTO> createBed(@RequestBody BedDTO bedDTO) {
		Bed bed = bedService.createBed(bedDTO.getBed());
		BedResponseDTO response = new BedResponseDTO();

		response.setBed(bed);
		response.setStatusCode(201);
		response.setMessage("Bed created successfully");
		return ResponseEntity.status(201).body(response);
	}

	@GetMapping("/getAllBeds")
	public ResponseEntity<List<Bed>> getAllBeds() {
		List<Bed> bed = bedService.getAllBeds();
		return ResponseEntity.status(201).body(bed);
	}

	@GetMapping("/getBed/{bedId}")
	public ResponseEntity<BedResponseDTO> getBedById(@PathVariable int bedId) {
		Bed bed = bedService.getBedById(bedId);
		BedResponseDTO dto = new BedResponseDTO();
		dto.setBed(bed);
		dto.setMessage("Found bed with ID: " + bedId);
		dto.setStatusCode(200);
		return ResponseEntity.status(200).body(dto);

	}


	@PutMapping("/updateBed")
	public ResponseEntity<BedResponseDTO> updateBed(@RequestBody BedDTO bedDTO) throws BedNotFoundException {
		Bed bed = bedService.updateBed(bedDTO.getBed());
		BedResponseDTO dto = new BedResponseDTO();
		dto.setBed(bed);
		dto.setStatusCode(200);
		dto.setMessage("Bed updated successfully");

		return ResponseEntity.status(200).body(dto);

	}

	@DeleteMapping("/delete/{bedId}")
	public ResponseEntity<String> deleteBed(@PathVariable int bedId) throws BedNotFoundException {
		bedService.delete(bedId);
		return ResponseEntity.status(200).body("Bed deleted successfully");
	}
	@PostMapping("/{bedId}/assign")
	public ResponseEntity<BedResponseDTO> assignPatient(@PathVariable int bedId, 
	        @RequestBody java.util.Map<String, Object> body) throws BedNotFoundException {
	    
	    com.medi360.entities.Patient patient = new com.medi360.entities.Patient();
	    patient.setPatientId((Integer) body.get("patientId"));
	    
	    Bed bed = bedService.assignPatientToBed(bedId, patient);
	    BedResponseDTO dto = new BedResponseDTO();
	    dto.setBed(bed);
	    dto.setStatusCode(200);
	    dto.setMessage("Patient assigned to bed " + bedId + " successfully");
	    return ResponseEntity.ok(dto);
	}
	@PutMapping("/{bedId}/discharge")
	public ResponseEntity<BedResponseDTO> dischargePatient(@PathVariable int bedId) throws BedNotFoundException {
	    Bed bed = bedService.dischargePatient(bedId);
	    BedResponseDTO dto = new BedResponseDTO();
	    dto.setBed(bed);
	    dto.setStatusCode(200);
	    dto.setMessage("Patient discharged and bed " + bedId + " is now available");
	    return ResponseEntity.ok(dto);
	}
	@GetMapping("/getAllPatientsPaginated")
	public Page<Bed> f6(@RequestParam(name="pgno") int pgno,
							@RequestParam(name="size") int size,
							@RequestParam(name="sorting") String sorting,
							@RequestParam(name="asc") boolean asc){
		Sort sort=asc?Sort.by(sorting).ascending() : Sort.by(sorting).descending();
		
		Pageable pageable=PageRequest.of(pgno, size,sort);
		return this.bedService.getAllBedsWithPaginated(pageable);
	}
	


}
