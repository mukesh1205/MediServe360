package com.medi360.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medi360.entities.Notification;

public interface NotificationRepository extends JpaRepository<Notification,Integer>{

}
