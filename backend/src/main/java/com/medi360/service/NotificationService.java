package com.medi360.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medi360.db.NotificationRepository;
import com.medi360.entities.Notification;

@Service
public class NotificationService {
	
	@Autowired
	private NotificationRepository notificationrepo;
	
	public Notification insertNotifications(Notification n) {
		return this.notificationrepo.save(n);
	}
}
