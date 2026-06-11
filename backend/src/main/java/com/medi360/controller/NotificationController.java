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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medi360.DTO.NotificationDTO;
import com.medi360.DTO.NotificationResponseDTO;
import com.medi360.entities.Notification;
import com.medi360.exception.NotificationNotfoundException;
import com.medi360.service.NotificationService;

@RestController
@RequestMapping("/notification")
public class NotificationController {
	
	@Autowired
	private NotificationService ns;
	
	@PostMapping("/insertnotificationdata")
	public ResponseEntity<NotificationResponseDTO> addNotification(@RequestBody NotificationDTO notificationDto) {
		return ResponseEntity.ok(this.ns.addNotification(notificationDto));
	}
	
	@GetMapping("/getpatientbyid/{id}")
	public ResponseEntity<List<NotificationResponseDTO>> getPatient(@PathVariable int id){
		System.out.println(id);
		return ResponseEntity.ok(this.ns.getPatient(id));
	}
	
	@GetMapping("/getdoctorbyid/{id}")
	public ResponseEntity<List<NotificationResponseDTO>> getDoctor(@PathVariable int id){
		return ResponseEntity.ok(this.ns.getDoctor(id));
	}
	
//	@PutMapping("/updatenotification")
//	public ResponseEntity<NotificationResponseDTO> updateUser(@RequestBody NotificationDTO notificationDto) throws NotificationNotfoundException{
//		Notification u=this.ns.updateNotification(notificationDto.getNotification());
//		NotificationResponseDTO urd=new NotificationResponseDTO();
//		
//		urd.setNotification(u);
//		urd.setMessage("Successfully updated notification");
//		urd.setStatusCode(200);
//		
//		return ResponseEntity.status(200).body(urd);
//	}
	
	@DeleteMapping("/deletenotification/{nid}")
	public String deleteNotification(@PathVariable int nid) throws NotificationNotfoundException{
		return this.ns.deleteNotification(nid);
	}
	
	@GetMapping("/fetchallnotifications")
	public ResponseEntity<List<NotificationResponseDTO>> getAllNotification(){
		return ResponseEntity.ok(ns.getAllNotification());
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
	
	@GetMapping("/findNotificationById/{id}")
	public Notification findbyid(@PathVariable int id) throws NotificationNotfoundException{
		return this.ns.findById(id);
	}
	
}
