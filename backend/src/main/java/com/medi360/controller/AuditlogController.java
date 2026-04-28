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
import com.medi360.DTO.UserDTO;
import com.medi360.DTO.UserResponseDTO;
import com.medi360.entities.Auditlog;
import com.medi360.entities.Patient;
import com.medi360.entities.User;
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
	public ResponseEntity<AuditlogResponseDTO> f1(@RequestBody AuditLogDTO ald){
		Auditlog l=this.auds.insertAuditlogs(ald.getAuditlog());
		AuditlogResponseDTO aud=new AuditlogResponseDTO();
		aud.setAuditlog(l);
		aud.setStatusCode(200);
		aud.setMessage("Inserted successfully");
		return ResponseEntity.status(201).body(aud);
		
	}
	
	@PutMapping("/updateAuditlog")
	public ResponseEntity<AuditlogResponseDTO> f2(@RequestBody AuditLogDTO ald){
		Auditlog l=this.auds.updateAuditlogs(ald.getAuditlog());
		AuditlogResponseDTO aud=new AuditlogResponseDTO();
		aud.setAuditlog(l);
		aud.setStatusCode(200);
		aud.setMessage("Updated successfully");
		
		return ResponseEntity.status(201).body(aud);
	}
	@DeleteMapping("/deleteAuditlog/{id}")
	public String f3(@PathVariable int id) {
		return this.auds.deleteAuditlog(id);
	}
	
	@GetMapping("/fetchAllAuditlogs")
	public List<Auditlog> f4(){
		return this.auds.getAllAuditlogs();
	}
	
	@GetMapping("/fetchAllAuditlogsPaginated")
	public Page<Auditlog> f6(@RequestParam(name="pgno") int pgno,
							@RequestParam(name="size") int size,
							@RequestParam(name="sorting") String sorting,
							@RequestParam(name="asc") boolean asc){
		Sort sort=asc?Sort.by(sorting).ascending() : Sort.by(sorting).descending();
		
		Pageable pageable=PageRequest.of(pgno, size,sort);
		return this.auds.getAllAuditlogsWithPagination(pageable);
	}
}
