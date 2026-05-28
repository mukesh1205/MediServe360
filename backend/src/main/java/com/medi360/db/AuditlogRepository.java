package com.medi360.db;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.medi360.entities.AuditLog;


@Repository
public interface AuditlogRepository extends JpaRepository<AuditLog,Integer>{
	
	List<AuditLog> findByUserUserId(int id);
	 @Transactional
	 void deleteByUserUserId(int id);
}
