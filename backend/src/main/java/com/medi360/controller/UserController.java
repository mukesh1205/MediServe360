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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medi360.DTO.AuditLogDTO;
import com.medi360.DTO.AuditlogResponseDTO;
import com.medi360.DTO.PatientDTO;
import com.medi360.DTO.PatientResponseDTO;
import com.medi360.DTO.UserDTO;
import com.medi360.DTO.UserResponseDTO;
import com.medi360.entities.Auditlog;
import com.medi360.entities.Patient;
import com.medi360.entities.User;
import com.medi360.service.AuditlogService;
import com.medi360.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserService us;
	
	@PostMapping("/insertuserdata")
	public ResponseEntity<UserResponseDTO> f1(@RequestBody UserDTO user){
		User l=this.us.insertUsers(user.getUser());
		System.out.println("okk");
		UserResponseDTO aud=new UserResponseDTO();
		aud.setUser(l);
		aud.setStatusCode(200);
		aud.setMessage("Inserted successfully");
		return ResponseEntity.status(201).body(aud);
	}
	
	@PutMapping("/updatePatient")
	public ResponseEntity<UserResponseDTO> f2(@RequestBody UserDTO ald){
		User l=this.us.updateUsers(ald.getUser());
		UserResponseDTO aud=new UserResponseDTO();
		aud.setUser(l);
		aud.setStatusCode(200);
		aud.setMessage("Updated successfully");
		
		return ResponseEntity.status(201).body(aud);
	}
	@DeleteMapping("/deletePatient/{id}")
	public String f3(@PathVariable int id) {
		return this.us.deleteUser(id);
	}
	
	@GetMapping("/fetchAllPatients")
	public List<User> f4(){
		return this.us.getAllUsers();
	}
	
	@GetMapping("/fetchAllUsersPaginated")
	public Page<User> f6(@RequestParam(name="pgno") int pgno,
							@RequestParam(name="size") int size,
							@RequestParam(name="sorting") String sorting,
							@RequestParam(name="asc") boolean asc){
		Sort sort=asc?Sort.by(sorting).ascending() : Sort.by(sorting).descending();
		
		Pageable pageable=PageRequest.of(pgno, size,sort);
		return this.us.getAllUsersWithPagination(pageable);
	}
}
