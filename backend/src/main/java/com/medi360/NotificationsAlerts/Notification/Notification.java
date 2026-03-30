package com.medi360.NotificationsAlerts.Notification;

import java.util.Date;

import com.medi360.IdentityAccessManagement.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Notification {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int notificationId;
	private User userId;
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
		this.userId = userId;
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
		return userId;
	}
	public void setUserId(User userId) {
		this.userId = userId;
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
