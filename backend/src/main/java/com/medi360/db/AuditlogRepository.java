package com.medi360.db;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medi360.entities.AuditLog;

@Repository
public interface AuditlogRepository extends JpaRepository<AuditLog,Integer>{
	
	List<AuditLog> findByUserUserId(int id);
	void deleteByUserUserId(int id);
}
