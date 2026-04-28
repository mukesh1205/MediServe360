package com.medi360.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.medi360.db.NotificationRepository;
import com.medi360.entities.Notification;
import com.medi360.entities.Patient;
import com.medi360.entities.User;

@Service
public class NotificationService {
	
	@Autowired
	private NotificationRepository notificationrepo;
	
	public Notification insertNotifications(Notification n) {
		return this.notificationrepo.save(n);
	}
	
	public Notification updateNotifications(Notification u) {
		return this.notificationrepo.save(u);
	}
	
	public String deleteNotification(int id) {
		this.notificationrepo.deleteById(id);
		return "successfully deleted";
	}
	public List<Notification> getAllNotifications() {
		return this.notificationrepo.findAll();
	}
	
	public Page<Notification> getAllNotificationsWithPagination(Pageable pageable) {
		return this.notificationrepo.findAll(pageable);
	}
}
