
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

import com.medi360.DTO.WardDTO;
import com.medi360.DTO.WardResponseDTO;
import com.medi360.entities.Ward;
import com.medi360.service.WardService;

@RestController
@RequestMapping("/ward")
public class WardController {
	@Autowired
	private  WardService wardService;
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
	public ResponseEntity<List<Ward>> getAllWard(){
		List <Ward> ward=wardService.getAllWard();
		return ResponseEntity.status(201).body(ward);
	}
	@GetMapping("/getWard/{wardId}")
	public ResponseEntity<WardResponseDTO> getWardById(@PathVariable int wardId) {
		Ward ward=wardService.getWardById(wardId);
		WardResponseDTO dto=new WardResponseDTO();
		dto.setWard(ward);
		dto.setStatusCode(200);
		dto.setMessage("found ward with Id: "+wardId);
		return ResponseEntity.status(200).body(dto);
	}
	@PutMapping("/updateWard")
	public ResponseEntity<WardResponseDTO> updateWard(@RequestBody WardDTO wardDTO) {
		Ward ward=wardService.updateWard(wardDTO.getWard());
		WardResponseDTO response=new WardResponseDTO();
		response.setWard(ward);
		response.setStatusCode(200);
		response.setMessage("Ward updated successfully");
		
		return ResponseEntity.status(200).body(response);
			}
	@DeleteMapping("/deleteWard/{wardId}")
	public ResponseEntity<String>deleteWard(@PathVariable int wardId) {
		 wardService.deleteWard(wardId);
		 return ResponseEntity.status(200).body("ward deleted succesfully");
	}
	 
}
