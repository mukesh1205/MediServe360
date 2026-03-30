package com.medi360.IdentityAccessManagement.user;

import java.util.List;

import com.medi360.IdentityAccessManagement.Auditlog.Auditlog;
import com.medi360.NotificationsAlerts.Notification.Notification;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int UserId;
	private String name;
	private String role;
	private String email;
	private String phone;
	@OneToMany(mappedBy="userId",cascade=CascadeType.ALL)
	private List<Auditlog> auditLogs;
	
	@OneToMany(mappedBy="user",cascade=CascadeType.ALL)
	private List<Notification> notifications;
	public List<Auditlog> getAuditLogs() {
		return auditLogs;
	}
	public void setAuditLogs(List<Auditlog> auditLogs) {
		this.auditLogs = auditLogs;
	}
	public int getUserId() {
		return UserId;
	}
	public void setUserId(int userId) {
		UserId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getEmail() {
		return email;
	}
	public User() {
		super();
	}
	public User(String name, String role, String email, String phone) {
		super();
		this.name = name;
		this.role = role;
		this.email = email;
		this.phone = phone;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	
}
