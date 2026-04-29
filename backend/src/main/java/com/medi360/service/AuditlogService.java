package com.medi360.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.medi360.db.AuditlogRepository;
import com.medi360.entities.AuditLog;
import com.medi360.entities.User;

@Service
public class AuditlogService {
	
	@Autowired
	private AuditlogRepository auditlogrepo;
	
	public AuditLog addAuditlog(AuditLog au) {
		return this.auditlogrepo.save(au);
	}
	
	public AuditLog updateAuditlog(AuditLog au) {
		return this.auditlogrepo.save(au);
	}
	
	public String deleteAuditlog(int id) {
		this.auditlogrepo.deleteById(id);
		return "Successfully deleted";
	}
	
	public List<AuditLog> getAllAuditlog(){
		return this.auditlogrepo.findAll();
	}
	
	public Page<AuditLog> getAllAuditlogsWithPagination(Pageable pageable) {
		return this.auditlogrepo.findAll(pageable);
	}
}
