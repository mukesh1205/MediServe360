package com.medi360.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class AuditLog {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int auditId;
	
	private String action;
	private LocalDateTime timestamp;
	
	@ManyToOne
	@JoinColumn(name="user_id",nullable=true)
	@OnDelete(action = OnDeleteAction.SET_NULL) 
	private User user;

	public AuditLog(String action, LocalDateTime timestamp, User user) {
		super();
		this.action = action;
		this.timestamp = timestamp;
		this.user = user;
	}

	public AuditLog() {
		super();
	}

	public int getAuditId() {
		return auditId;
	}

	public void setAuditId(int auditId) {
		this.auditId = auditId;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
}
