package com.medi360.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medi360.DTO.AuditLogDTO;
import com.medi360.DTO.AuditlogResponseDTO;
import com.medi360.entities.Auditlog;
import com.medi360.service.AuditlogService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping("/api")
@Tag(name = "User Controller", description = "Operations related to user management")
public class AuditlogController {
	
	@Autowired
	AuditlogService auds;
	
	@PostMapping("/insertauditlogdata")
	@Operation(summary = "Get user by ID", description = "Returns a single user object based on ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved user"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
	public ResponseEntity<AuditlogResponseDTO> f1(@RequestBody AuditLogDTO ald){
		Auditlog l=this.auds.insertUsers(ald.getAuditlog());
		AuditlogResponseDTO aud=new AuditlogResponseDTO();
		aud.setAuditlog(l);
		aud.setStatusCode(200);
		aud.setMessage("Inserted successfully");
		return ResponseEntity.status(201).body(aud);
		
	}
}
