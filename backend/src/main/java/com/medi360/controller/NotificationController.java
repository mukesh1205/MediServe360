package com.medi360.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.medi360.DTO.NotificationDTO;
import com.medi360.DTO.NotificationResponseDTO;
import com.medi360.entities.Notification;
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
}
