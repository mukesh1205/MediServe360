package com.medi360.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medi360.DTO.AuditlogDTO;
import com.medi360.DTO.AuditlogResponseDTO;
import com.medi360.entities.AuditLog;
import com.medi360.exception.AuditNotFoundException;
import com.medi360.service.AuditlogService;

@RestController
@RequestMapping("/auditlog")
public class AuditlogController {
	
	@Autowired
	private AuditlogService as;
	
	@PostMapping("/insertauditlog")
	public ResponseEntity<AuditlogResponseDTO> addAuditlog(@RequestBody AuditlogDTO ald){
		AuditLog a=this.as.addAuditlog(ald.getAuditLog());
		
		AuditlogResponseDTO dto=new AuditlogResponseDTO();
		
		dto.setAuditlog(a);
		dto.setMessage("Successfully added auditlog");
		dto.setStatusCode(201);
		
		return ResponseEntity.status(201).body(dto);
	}
	
//	@PutMapping("/updateauditlog")
//	public ResponseEntity<AuditlogResponseDTO> updateAuditlog(@RequestBody AuditlogDTO ald){
//		AuditLog a=this.as.addAuditlog(ald.getAuditLog());
//		
//		AuditlogResponseDTO dto=new AuditlogResponseDTO();
//		
//		dto.setAuditlog(a);
//		dto.setMessage("Successfully updated auditlog");
//		dto.setStatusCode(200);
//		
//		return ResponseEntity.status(200).body(dto);
//	}
//	
//	@DeleteMapping("/deleteauditlog/{uid}")
//	public String deleteAuditlog(@PathVariable int uid) {
//		return this.deleteAuditlog(uid);
//	}
	
	@GetMapping("/fetchallauditlog")
	public List<AuditLog> getAllAuditlog(){
		return this.as.getAllAuditlog();
	}
	
	@GetMapping("/fetchAllAuditlogsPaginated")
	public Page<AuditLog> f6(@RequestParam(name="pgno") int pgno,
							@RequestParam(name="size") int size,
							@RequestParam(name="sorting") String sorting,
							@RequestParam(name="asc") boolean asc){
		Sort sort=asc?Sort.by(sorting).ascending() : Sort.by(sorting).descending();
		
		Pageable pageable=PageRequest.of(pgno, size,sort);
		return this.as.getAllAuditlogsWithPagination(pageable);
	}
	
	@GetMapping("/findauditlogbyid/{id}")
	public AuditLog findById(@PathVariable int id) throws AuditNotFoundException{
		return this.as.findById(id);
	}
	
	@GetMapping("/findAllAuditsOfUser/{id}")
	public List<AuditLog> findAllAuditsOfUser(@PathVariable int id){
		return this.as.findAllAuditsOfUser(id);
	}
}
