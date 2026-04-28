package com.medi360.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.medi360.DTO.NotificationDTO;
import com.medi360.DTO.NotificationResponseDTO;
import com.medi360.DTO.UserDTO;
import com.medi360.DTO.UserResponseDTO;
import com.medi360.entities.Auditlog;
import com.medi360.entities.Notification;
import com.medi360.entities.User;
import com.medi360.service.NotificationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping("/api")
public class NotificationController {
	
	@Autowired
	NotificationService ns;
	
	@PostMapping("/insetnotification")
	public ResponseEntity<NotificationResponseDTO> f1(@RequestBody NotificationDTO nd) {
		Notification n=this.ns.insertNotifications(nd.getNotification());
		NotificationResponseDTO nr=new NotificationResponseDTO();
		nr.setNotification(n);
		nr.setMessage("Successfully Inserted");
		nr.setStatusCode(200);
		
		return ResponseEntity.status(201).body(nr);
	}
	
	@PutMapping("/updateNotification")
	public ResponseEntity<NotificationResponseDTO> f2(@RequestBody NotificationDTO ald){
		Notification l=this.ns.updateNotifications(ald.getNotification());
		NotificationResponseDTO aud=new NotificationResponseDTO();
		aud.setNotification(l);
		aud.setStatusCode(200);
		aud.setMessage("Updated successfully");
		
		return ResponseEntity.status(201).body(aud);
	}
	@DeleteMapping("/deleteNotification/{id}")
	public String f3(@PathVariable int id) {
		return this.ns.deleteNotification(id);
	}
	
	@GetMapping("/fetchAllNotifications")
	public List<Notification> f4(){
		return this.ns.getAllNotifications();
	}
	
	@GetMapping("/fetchAllNotificationsPaginated")
	public Page<Notification> f6(@RequestParam(name="pgno") int pgno,
							@RequestParam(name="size") int size,
							@RequestParam(name="sorting") String sorting,
							@RequestParam(name="asc") boolean asc){
		Sort sort=asc?Sort.by(sorting).ascending() : Sort.by(sorting).descending();
		
		Pageable pageable=PageRequest.of(pgno, size,sort);
		return this.ns.getAllNotificationsWithPagination(pageable);
	}
}
