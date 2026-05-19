package com.medi360.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.medi360.db.NotificationRepository;
import com.medi360.entities.Notification;
import com.medi360.entities.User;
import com.medi360.exception.NotificationNotfoundException;
import com.medi360.exception.UserNotFoundException;

@Service
public class NotificationService {
	
	@Autowired
	private NotificationRepository notificationrepo;
	
	public Notification addNotification(Notification notification) {
		return this.notificationrepo.save(notification);
	}
	
	public Notification updateNotification(Notification notification) throws NotificationNotfoundException{
		if (!notificationrepo.existsById(notification.getNotificationId())) {
			throw new NotificationNotfoundException("Notification not found with id " + notification.getNotificationId());
		}
		return this.notificationrepo.save(notification);
	}
	
	public String deleteNotification(int id) throws NotificationNotfoundException{
		
		if (!notificationrepo.existsById(id)) {
			throw new NotificationNotfoundException("Notification not found with id " + id);
		}
		
		this.notificationrepo.deleteById(id);
		return "Successfully deleted";
	}
	
	public List<Notification> getAllNotification(){
		return this.notificationrepo.findAll();
	}
	
	public Page<Notification> getAllNotificationsWithPagination(Pageable pageable) {
		return this.notificationrepo.findAll(pageable);
	}
	
	public Notification findById(int id) throws NotificationNotfoundException{
		if (!notificationrepo.existsById(id)) {
			throw new NotificationNotfoundException("Notification not found with id " + id);
		}
		return this.notificationrepo.findById(id).get();
	}
	
}
