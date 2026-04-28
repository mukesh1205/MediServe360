package com.medi360.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.medi360.db.AuditlogRepository;
import com.medi360.entities.Auditlog;
import com.medi360.entities.Patient;
import com.medi360.entities.User;

@Service
public class AuditlogService {
	
	@Autowired
	private AuditlogRepository auditlogrepo;
	
	public Auditlog insertAuditlogs(Auditlog u) {
		return this.auditlogrepo.save(u);
	}
	
	public Auditlog updateAuditlogs(Auditlog u) {
		return this.auditlogrepo.save(u);
	}
	
	public String deleteAuditlog(int id) {
		this.auditlogrepo.deleteById(id);
		return "successfully deleted";
	}
	public List<Auditlog> getAllAuditlogs() {
		return this.auditlogrepo.findAll();
	}
	
	public Page<Auditlog> getAllAuditlogsWithPagination(Pageable pageable) {
		return this.auditlogrepo.findAll(pageable);
	}
}
