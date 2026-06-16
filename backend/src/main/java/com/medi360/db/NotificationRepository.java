package com.medi360.db;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.medi360.entities.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

	
    List<Notification> findByUser_UserIdOrderByCreatedDateDesc(int userId);

    List<Notification> findByUser_UserIdAndStatus(int userId, String status);

    Page<Notification> findAll(Pageable pageable);
}