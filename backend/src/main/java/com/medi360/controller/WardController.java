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

import com.medi360.entities.Ward;
import com.medi360.service.WardService;

@RestController
@RequestMapping("/api/ward")
public class WardController {
	private final WardService wardService;
	
	public WardController(WardService wardService) {
		// TODO Auto-generated constructor stub
		this.wardService=wardService;
	}
	
	 @PostMapping("/create")
	 public Ward createWard(@RequestBody Ward ward) {
		 return wardService.createWard(ward);
	 }
	@GetMapping("/getAllWards")
	public List<Ward> getAllWard(){
		return wardService.getAllWard();
	}
	@GetMapping("/getWardById/{id}")
	public Ward getWardById(@PathVariable("id") int wardId) {
		return wardService.getWardById(wardId);
	}
	@PutMapping("/updateWard")
	public Ward updateWard(@RequestBody Ward ward) {
		return wardService.updateWard( ward);
	}
	@DeleteMapping("/deleteWard/{id}")
	public String deleteWard(@PathVariable("id") int wardId) {
		 wardService.deleteWard(wardId);
		 return "ward deleted";
	}
	 
}
