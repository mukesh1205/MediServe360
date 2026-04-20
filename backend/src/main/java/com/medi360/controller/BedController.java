package com.medi360.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	public Bed createBed(@RequestBody Bed bed){	
		return bedService.createBed(bed);
	}
	@GetMapping("/getAllBeds")
	public List<Bed> getAllBeds(){
		return bedService.getAllBeds();
	}
	
	@GetMapping("/getBedById/{id}")
	public Bed getBedById(@PathVariable("id") int bedId) {
		return bedService.getBedById(bedId);
		
	}
	@PutMapping("/update")
	public Bed updateBed(@RequestBody Bed bed) {
		return bedService.updateBed( bed);
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteBed(@PathVariable("id") int bedId) {
		bedService.delete(bedId);
		return "bed deleted";
		
	}
	

}
