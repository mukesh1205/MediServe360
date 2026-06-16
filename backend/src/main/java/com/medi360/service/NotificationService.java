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
import com.medi360.db.NotificationRepository;
import com.medi360.db.UserRepository;
import com.medi360.entities.Notification;
import com.medi360.entities.User;
import com.medi360.exception.NotificationNotfoundException;
import com.medi360.exception.ResourceNotFoundException;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationrepo;

    @Autowired
    private UserRepository userRepository;


    public NotificationResponseDTO addNotification(NotificationDTO dto) {
        User user = userRepository.findById(dto.getUserID())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with ID: " + dto.getUserID()));

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setMessage(dto.getMessage());
        notification.setCategory(dto.getCategory());
        notification.setStatus("UNREAD");
        notification.setCreatedDate(LocalDateTime.now());

        return mapToDTO(notificationrepo.save(notification));
    }

    public List<NotificationResponseDTO> getNotificationsByUserId(int userId) {
        return notificationrepo
                .findByUser_UserIdOrderByCreatedDateDesc(userId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }


    public NotificationResponseDTO markAsRead(int notificationId)
            throws NotificationNotfoundException {
        Notification n = notificationrepo.findById(notificationId)
                .orElseThrow(() -> new NotificationNotfoundException(
                        "Notification not found with id " + notificationId));
        n.setStatus("READ");
        return mapToDTO(notificationrepo.save(n));
    }

    public String deleteNotification(int id) throws NotificationNotfoundException {
        if (!notificationrepo.existsById(id)) {
            throw new NotificationNotfoundException(
                    "Notification not found with id " + id);
        }
        notificationrepo.deleteById(id);
        return "Successfully deleted";
    }

 
    public List<NotificationResponseDTO> getAllNotification() {
        return notificationrepo.findAll()
                .stream().map(this::mapToDTO)
                .collect(Collectors.toList());
    }


    public Page<Notification> getAllNotificationsWithPagination(Pageable pageable) {
        return notificationrepo.findAll(pageable);
    }


    public Notification findById(int id) throws NotificationNotfoundException {
        if (!notificationrepo.existsById(id)) {
            throw new NotificationNotfoundException(
                    "Notification not found with id " + id);
        }
        return notificationrepo.findById(id).get();
    }

    private NotificationResponseDTO mapToDTO(Notification n) {
        NotificationResponseDTO dto = new NotificationResponseDTO();
        dto.setNotificationID(n.getNotificationId());
        dto.setMessage(n.getMessage());
        dto.setCategory(n.getCategory());
        dto.setStatus(n.getStatus());
        dto.setCreatedDate(n.getCreatedDate());
        if (n.getUser() != null) {
            dto.setUserID(n.getUser().getUserId());
        }
        return dto;
    }
}