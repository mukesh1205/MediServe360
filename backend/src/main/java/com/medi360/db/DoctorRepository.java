package com.medi360.db;


import java.util.Optional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medi360.entities.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
	
	Optional<Doctor> findByEmail(String email);

	long count();

    List<Doctor> findByDepartment(String department);

    long countByDepartment(String department);

    long countByAvailabilitySchedule(String availability);

    List<Doctor> findByNameContainingIgnoreCase(String name);

}
