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

import com.medi360.DTO.BedDTO;
import com.medi360.DTO.BedResponseDTO;
import com.medi360.entities.Bed;
import com.medi360.service.BedService;

@RestController
@RequestMapping("/api/beds")
public class BedController {
	private final BedService bedService ;
	
	public BedController(BedService bedService) {
		this.bedService=bedService;
	}
	
	@PostMapping("/create")
	public ResponseEntity<BedResponseDTO> createBed(@RequestBody BedDTO bedDTO){	
		Bed bed=bedService.createBed(bedDTO.getBed());
		BedResponseDTO response=new BedResponseDTO();
		response.setBed(bed);
		response.setStatusCode(201);
		response.setMessage("Bed created successfully");
		return ResponseEntity.status(201).body(response);
	}
	@GetMapping("/getAllBeds")
	public List<Bed> getAllBeds(){
		return bedService.getAllBeds();
	}
	
	@GetMapping("/getBedById/{id}")
	public Bed getBedById(@PathVariable("id") int bedId) {
		return bedService.getBedById(bedId);
		
	}
	@PutMapping("/updateBed/{id}")
	public ResponseEntity<BedResponseDTO> updateBed(@PathVariable("id")int bedId, @RequestBody BedDTO bedDTO) {
		Bed bed=bedDTO.getBed();
        bed.setBedId(bedId);   // important: ensures UPDATE, not INSERT

        Bed updatedBed = bedService.updateBed(bed);

        BedResponseDTO response = new BedResponseDTO();
        response.setBed(updatedBed);
        response.setStatusCode(200);
        response.setMessage("Bed updated successfully");

        return ResponseEntity.ok(response);

		}
	
	@DeleteMapping("/delete/{id}")

public ResponseEntity<String> deleteBed(@PathVariable("id") int bedId) {
        bedService.delete(bedId);
        return ResponseEntity.ok("Bed deleted successfully");
    }

	

}
