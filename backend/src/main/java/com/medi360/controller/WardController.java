
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

import com.medi360.DTO.WardDTO;
import com.medi360.DTO.WardResponseDTO;
import com.medi360.entities.Ward;
import com.medi360.service.WardService;

@RestController
@RequestMapping("/api/ward")
public class WardController {
	private  WardService wardService;
	
	public WardController(WardService wardService) {
		// TODO Auto-generated constructor stub
		this.wardService=wardService;
	}
	
	 @PostMapping("/create")
	 public ResponseEntity<WardResponseDTO> createWard(@RequestBody WardDTO wardDTO) {
		 Ward ward=wardService.createWard(wardDTO.getWard());
		 WardResponseDTO response=new WardResponseDTO();
		 response.setWard(ward);
		 response.setStatusCode(201);
		 response.setMessage("Ward created successfully");
		 return ResponseEntity.status(201).body(response);
	 }
	@GetMapping("/getAllWards")
	public List<Ward> getAllWard(){
		return wardService.getAllWard();
	}
	@GetMapping("/getWardById/{id}")
	public Ward getWardById(@PathVariable("id") int wardId) {
		return wardService.getWardById(wardId);
	}
	@PutMapping("/updateWard/{id}")
	public ResponseEntity<WardResponseDTO> updateWard(@PathVariable("id")int wardId,@RequestBody WardDTO wardDTO) {
		Ward ward=wardDTO.getWard();
		ward.setWardId(wardId);
		Ward updateWard=wardService.updateWard(ward);
		WardResponseDTO response=new WardResponseDTO();
		response.setWard(updateWard);
		response.setStatusCode(200);
		response.setMessage("Ward updated successfully");
		
	return ResponseEntity.ok(response);
			}
	@DeleteMapping("/deleteWard/{id}")
	public ResponseEntity<String>deleteWard(@PathVariable("id") int wardId) {
		 wardService.deleteWard(wardId);
		 return ResponseEntity.ok("Ward deleted successfully");
	}
	 
}
