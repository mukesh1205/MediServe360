
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

import com.medi360.DTO.WardDTO;
import com.medi360.DTO.WardResponseDTO;
import com.medi360.entities.Ward;
import com.medi360.exception.WardNotFoundException;
import com.medi360.service.WardService;

@RestController
@RequestMapping("/api/ward")
public class WardController {

	@Autowired
	private WardService wardService;

	@PostMapping("/create")
	public ResponseEntity<WardResponseDTO> createWard(@RequestBody WardDTO wardDTO) {
		Ward ward = wardService.createWard(wardDTO.getWard());
		WardResponseDTO response = new WardResponseDTO();
		response.setWard(ward);
		response.setStatusCode(201);
		response.setMessage("Ward created successfully");
		return ResponseEntity.status(201).body(response);
	}


	@GetMapping("/getAllWards")
	public ResponseEntity<List<Ward>> getAllWard() {
		List<Ward> ward = wardService.getAllWard();
		return ResponseEntity.status(201).body(ward);
	}

	@GetMapping("/getWard/{wardId}")
	public ResponseEntity<WardResponseDTO> getWardById(@PathVariable int wardId) {
		Ward ward = wardService.getWardById(wardId);
		WardResponseDTO dto = new WardResponseDTO();
		dto.setWard(ward);
		dto.setStatusCode(200);
		dto.setMessage("found ward with Id: " + wardId);
		return ResponseEntity.status(200).body(dto);
	}


	@PutMapping("/updateWard")
	public ResponseEntity<WardResponseDTO> updateWard(@RequestBody WardDTO wardDTO) throws WardNotFoundException {
		Ward ward = wardService.updateWard(wardDTO.getWard());
		WardResponseDTO response = new WardResponseDTO();
		response.setWard(ward);
		response.setStatusCode(200);
		response.setMessage("Ward updated successfully");

		return ResponseEntity.status(200).body(response);
	}

	@DeleteMapping("/deleteWard/{wardId}")
	public ResponseEntity<String> deleteWard(@PathVariable int wardId) throws WardNotFoundException {
		wardService.deleteWard(wardId);
		return ResponseEntity.status(200).body("ward deleted succesfully");
	}
	
	@GetMapping("/{wardId}/occupancy-report")
	public ResponseEntity<String> getOccupancyReport(@PathVariable int wardId) throws com.medi360.exception.WardNotFoundException {
	    String report = wardService.getWardOccupancyReport(wardId);
	    return ResponseEntity.ok(report);
	}
	@GetMapping("/getAllWardsPaginated")
	public Page<Ward> f6(@RequestParam(name = "pgno") int pgno, @RequestParam(name = "size") int size,@RequestParam(name = "sorting") String sorting, @RequestParam(name = "asc") boolean asc) {
		Sort sort = asc ? Sort.by(sorting).ascending() : Sort.by(sorting).descending();
		Pageable pageable = PageRequest.of(pgno, size, sort);
		return this.wardService.getAllWardsWithPaginated(pageable);


	}
}
