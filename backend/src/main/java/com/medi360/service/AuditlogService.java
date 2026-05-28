package com.medi360.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.medi360.DTO.AuditlogResponseDTO;
import com.medi360.db.AuditlogRepository;
import com.medi360.db.UserRepository;
import com.medi360.entities.AuditLog;
import com.medi360.exception.AuditNotFoundException;
import com.medi360.exception.ResourceNotFoundException;
//import com.medi360.entities.User;
import com.medi360.exception.UserNotFoundException;

@Service
public class AuditlogService {
	
	@Autowired
	private AuditlogRepository auditlogrepo;
	
	@Autowired
	private UserRepository userrepo;
	public AuditLog addAuditlog(AuditLog au) {
		return this.auditlogrepo.save(au);
	}
	public void log(String action) {
	    log(action, getCurrentUsername());
	}

	public void log(String action, String performedByEmail) {
	    AuditLog log = new AuditLog();
	    log.setAction(action);
	    log.setTimestamp(LocalDateTime.now());
	    userrepo.findByEmail(performedByEmail).ifPresent(log::setUser);
	    auditlogrepo.save(log);
	}


	public void logFailure(String action, String errorMessage) {
	    log(action + "_FAILED | Error: " + errorMessage);
	}

	public void logFailure(String action, String errorMessage, String performedByEmail) {
	    log(action + "_FAILED | Error: " + errorMessage, performedByEmail);
	}
//	public AuditLog updateAuditlog(AuditLog au) {
//		return this.auditlogrepo.save(au);
//	}
//	
//	public String deleteAuditlog(int id) {
//		this.auditlogrepo.deleteById(id);
//		return "Successfully deleted";
//	}
	
	public List<AuditlogResponseDTO> getAllAuditlog(){
		
		return this.auditlogrepo.findAll()
				.stream().map(this::mapToDTO)
				.collect(Collectors.toList());
	}
	
	public Page<AuditLog> getAllAuditlogsWithPagination(Pageable pageable) {
		return this.auditlogrepo.findAll(pageable);
	}
	
//	public AuditLog insertUserAuditlog(AuditLog au) {
//		return this.auditlogrepo.save(au);
//	}
	
	public AuditlogResponseDTO findById(int id) throws AuditNotFoundException{
		
		AuditLog a=auditlogrepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Audit log not found with ID:"+id));
		AuditlogResponseDTO ans=new AuditlogResponseDTO();
		ans=mapToDTO(a);
		return ans;
	}
	
	public List<AuditLog> findAllAuditsOfUser(int id){
		return this.auditlogrepo.findByUserUserId(id);
	}
	
	private String getCurrentUsername() {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    return (auth != null && auth.isAuthenticated()) ? auth.getName() : "ANONYMOUS";
	}
	
	private AuditlogResponseDTO mapToDTO(AuditLog a) {
	    AuditlogResponseDTO dto = new AuditlogResponseDTO();
	    dto.setAuditId(a.getAuditId());
	    dto.setAction(a.getAction());
	    dto.setTimestamp(a.getTimestamp());
	    if (a.getUser() != null) {
	        dto.setUserId(a.getUser().getUserId());
	        
	    }
	    return dto;
	}
}
