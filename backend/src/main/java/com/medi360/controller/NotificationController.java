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
    public ResponseEntity<NotificationResponseDTO> addNotification(
            @RequestBody NotificationDTO notificationDto) {
        return ResponseEntity.ok(ns.addNotification(notificationDto));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationResponseDTO>> getByUser(
            @PathVariable int userId) {
        return ResponseEntity.ok(ns.getNotificationsByUserId(userId));
    }


    @PutMapping("/markread/{id}")
    public ResponseEntity<NotificationResponseDTO> markAsRead(
            @PathVariable int id) throws NotificationNotfoundException {
        return ResponseEntity.ok(ns.markAsRead(id));
    }

    @DeleteMapping("/deletenotification/{nid}")
    public String deleteNotification(
            @PathVariable int nid) throws NotificationNotfoundException {
        return ns.deleteNotification(nid);
    }

    @GetMapping("/fetchallnotifications")
    public ResponseEntity<List<NotificationResponseDTO>> getAllNotification() {
        return ResponseEntity.ok(ns.getAllNotification());
    }

    @GetMapping("/fetchAllNotificationsPaginated")
    public Page<Notification> getPaginated(
            @RequestParam int pgno,
            @RequestParam int size,
            @RequestParam String sorting,
            @RequestParam boolean asc) {
        Sort sort = asc
                ? Sort.by(sorting).ascending()
                : Sort.by(sorting).descending();
        Pageable pageable = PageRequest.of(pgno, size, sort);
        return ns.getAllNotificationsWithPagination(pageable);
    }

    @GetMapping("/findNotificationById/{id}")
    public Notification findById(
            @PathVariable int id) throws NotificationNotfoundException {
        return ns.findById(id);
    }
}