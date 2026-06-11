package com.medi360.db;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medi360.entities.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    List<Appointment> findByDoctor_IdAndDateOrderByTimeAsc(int doctorId, LocalDate date);

    List<Appointment> findByDoctor_IdOrderByDateAscTimeAsc(int doctorId);

    long count();

    long countByDate(LocalDate date);

    long countByStatus(String status);

    long countByDoctor_Id(int doctorId);

    long countByDoctor_IdAndDate(int doctorId, LocalDate date);
}

