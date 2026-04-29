package com.medi360.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	private int userId;
	
	private String userName;
	private String userRole;
	private String userEmail;
	private String userPhone;
	
	@OneToMany(mappedBy="user",cascade=CascadeType.ALL)
	@JsonIgnore
	private List<AuditLog> auditsLogs;
	
	@OneToMany(mappedBy="user",cascade=CascadeType.ALL)
	@JsonIgnore
	private List<Notification> notification;
	
	
	public List<AuditLog> getAuditsLogs() {
		return auditsLogs;
	}
	public void setAuditsLogs(List<AuditLog> auditsLogs) {
		this.auditsLogs = auditsLogs;
	}
	public List<Notification> getNotification() {
		return notification;
	}
	public void setNotification(List<Notification> notification) {
		this.notification = notification;
	}
	public User(String userName, String userRole, String userEmail, String userPhone) {
		super();
		this.userName = userName;
		this.userRole = userRole;
		this.userEmail = userEmail;
		this.userPhone = userPhone;
	}
	public User() {
		super();
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserRole() {
		return userRole;
	}
	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getUserPhone() {
		return userPhone;
	}
	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}
	
	
	
}
