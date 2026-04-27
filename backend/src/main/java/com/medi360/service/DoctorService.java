package com.medi360.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.medi360.db.DoctorRepository;
import com.medi360.entities.Doctor;

@Service
public class DoctorService {
	
	private final DoctorRepository doctorRepository;
	
	public DoctorService(DoctorRepository doctorRepository) {
		this.doctorRepository = doctorRepository;
	}
	
	
	public Doctor addDoctor(Doctor doctor) {
		return doctorRepository.save(doctor);
	}
	
	public Doctor updateDoctor(Doctor doctor) {
		return doctorRepository.save(doctor);
	}
	
	public void deleteDoctor(int docterId) {
	   doctorRepository.deleteById(docterId);
	}
	
    public Doctor getDoctorById(int id) {
		return doctorRepository.findById(id).get();
	}
    
	public List<Doctor> getAllDoctors() {
		return doctorRepository.findAll();
	}
	
	/* public Page<Doctor> getAllDoctorsWithPagination (Pageable pageable){
		return doctorRepository.findAll(pageable);
	} */
    
}








