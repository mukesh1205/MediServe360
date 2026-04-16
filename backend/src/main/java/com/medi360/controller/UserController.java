package com.medi360.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

import com.medi360.DTO.AuditLogDTO;
import com.medi360.DTO.AuditlogResponseDTO;
import com.medi360.DTO.UserDTO;
import com.medi360.DTO.UserResponseDTO;
import com.medi360.entities.Auditlog;
import com.medi360.entities.User;
import com.medi360.service.AuditlogService;
import com.medi360.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

public class UserController {
	@Autowired
	UserService us;
	
	@PostMapping("/insertuserdata")
	
	public ResponseEntity<UserResponseDTO> f1(@RequestBody UserDTO ald){
		User l=this.us.insertUsers(ald.getUser());
		UserResponseDTO aud=new UserResponseDTO();
		aud.setUser(l);
		aud.setStatusCode(200);
		aud.setMessage("Inserted successfully");
		return ResponseEntity.status(201).body(aud);
	}
}
