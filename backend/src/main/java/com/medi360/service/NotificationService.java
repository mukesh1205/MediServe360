package com.medi360.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.medi360.DTO.NotificationDTO;
import com.medi360.DTO.NotificationResponseDTO;
import com.medi360.db.DoctorRepository;
import com.medi360.db.NotificationRepository;
import com.medi360.db.PatientRepository;
import com.medi360.entities.Doctor;
import com.medi360.entities.Notification;
import com.medi360.entities.Patient;
import com.medi360.exception.NotificationNotfoundException;
import com.medi360.exception.ResourceNotFoundException;

@Service
public class NotificationService {
	
	@Autowired
	private NotificationRepository notificationrepo;
	
	@Autowired
	private PatientRepository ps;
	
	@Autowired
	private DoctorRepository ds;
	
	public NotificationResponseDTO addNotification(NotificationDTO dto) {
		Patient patient = ps.findById(dto.getPatientID())
		        .orElseThrow(() -> new ResourceNotFoundException(
		                "Patient not found with ID: " + dto.getPatientID()));
		
		Doctor doctor=ds.findById(dto.getDoctorID()).orElseThrow(()->new ResourceNotFoundException("Doctor not found with ID: "+dto.getDoctorID()));

		Notification notification = new Notification();
		notification.setPatient(patient);
		notification.setDoctor(doctor);
		notification.setMessage(dto.getMessage());
		notification.setCategory(dto.getCategory());
		notification.setStatus("UNREAD");
		notification.setCreatedDate(LocalDateTime.now());

		return mapToDTO(notificationrepo.save(notification));
	}
	
//	public Notification updateNotification(Notification notification) throws NotificationNotfoundException{
//		if (!notificationrepo.existsById(notification.getNotificationId())) {
//			throw new NotificationNotfoundException("Notification not found with id " + notification.getNotificationId());
//		}
//		return this.notificationrepo.save(notification);
//	}
	
	public String deleteNotification(int id) throws NotificationNotfoundException{
		
		if (!notificationrepo.existsById(id)) {
			throw new NotificationNotfoundException("Notification not found with id " + id);
		}
		
		this.notificationrepo.deleteById(id);
		return "Successfully deleted";
	}
	
	public List<NotificationResponseDTO> getAllNotification(){
		return notificationrepo.findAll()
				.stream().map(this::mapToDTO)
				.collect(Collectors.toList());
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
	
	public List<NotificationResponseDTO> getPatient(int id) {
		List<Notification> notifications = notificationrepo.findByPatientPatientId(id);
		if (notifications.isEmpty()) {
	        throw new ResourceNotFoundException("Patient not found with ID: " + id);
	    }
		        
		
		return notifications.stream()
	            .map(this::mapToDTO)
	            .collect(Collectors.toList());
		
	}
	
	public List<NotificationResponseDTO> getDoctor(int id) {
		List<Notification> notifications = notificationrepo.findByDoctorId(id);
		if (notifications.isEmpty()) {
	        throw new ResourceNotFoundException("Doctor not found with ID: " + id);
	    }
		        
		
		return notifications.stream()
	            .map(this::mapToDTO)
	            .collect(Collectors.toList());
		
	}
	
	private NotificationResponseDTO mapToDTO(Notification n) {
	    NotificationResponseDTO dto = new NotificationResponseDTO();
	    dto.setNotificationID(n.getNotificationId());
	    dto.setMessage(n.getMessage());
	    dto.setCategory(n.getCategory());
	    dto.setStatus(n.getStatus());
	    dto.setCreatedDate(n.getCreatedDate());
	    dto.setDoctorID(n.getDoctor().getId());
	    dto.setPatientID(n.getPatient().getPatientId());
	    
	    return dto;
	}
}
