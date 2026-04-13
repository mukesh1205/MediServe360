package com.medi360.entities;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Auditlog {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int auditId;
	private String action;
	private Timestamp timestamp;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;

	public Auditlog() {
		super();
	}

	public Auditlog(String action, Timestamp timestamp, User user) {
		super();
		this.action = action;
		this.timestamp = timestamp;
		this.user = user;
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

	public Timestamp getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
