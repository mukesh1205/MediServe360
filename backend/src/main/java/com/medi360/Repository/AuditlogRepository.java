package com.medi360.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medi360.entities.Auditlog;

public interface AuditlogRepository extends JpaRepository<Auditlog,Integer>{

}
