package com.medi360.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Notification {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int notificationId;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	private String notificationmessage;
	private String notificationcategory;
	private String notificationStatus;
	private Date notificationCreatedDate;
	public Notification() {
		super();
	}
	public Notification(User userId, String notificationmessage, String notificationcategory, String notificationStatus,
			Date notificationCreatedDate) {
		super();
		this.user = userId;
		this.notificationmessage = notificationmessage;
		this.notificationcategory = notificationcategory;
		this.notificationStatus = notificationStatus;
		this.notificationCreatedDate = notificationCreatedDate;
	}
	public int getNotificationId() {
		return notificationId;
	}
	public void setNotificationId(int notificationId) {
		this.notificationId = notificationId;
	}
	public User getUserId() {
		return user;
	}
	public void setUserId(User userId) {
		this.user = userId;
	}
	public String getNotificationmessage() {
		return notificationmessage;
	}
	public void setNotificationmessage(String notificationmessage) {
		this.notificationmessage = notificationmessage;
	}
	public String getNotificationcategory() {
		return notificationcategory;
	}
	public void setNotificationcategory(String notificationcategory) {
		this.notificationcategory = notificationcategory;
	}
	public String getNotificationStatus() {
		return notificationStatus;
	}
	public void setNotificationStatus(String notificationStatus) {
		this.notificationStatus = notificationStatus;
	}
	public Date getNotificationCreatedDate() {
		return notificationCreatedDate;
	}
	public void setNotificationCreatedDate(Date notificationCreatedDate) {
		this.notificationCreatedDate = notificationCreatedDate;
	}
	
	
	
}
