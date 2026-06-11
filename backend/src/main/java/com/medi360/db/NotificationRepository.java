package com.medi360.db;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medi360.entities.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Integer>{
	List<Notification> findByPatientPatientId(int patientId);
	List<Notification> findByDoctorId(int doctorId);
}
