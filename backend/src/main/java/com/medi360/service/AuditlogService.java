package com.medi360.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medi360.db.AuditlogRepository;
import com.medi360.entities.Auditlog;
import com.medi360.entities.User;

@Service
public class AuditlogService {
	
	@Autowired
	private AuditlogRepository auditlogrepo;
	
	public Auditlog insertUsers(Auditlog u) {
		return this.auditlogrepo.save(u);
	}
}
