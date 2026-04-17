package com.medi360.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medi360.db.PatientRepository;
import com.medi360.entities.Patient;

@Service
public class PatientService {
	@Autowired
	PatientRepository patientRepository;
	public Patient addPatient(Patient patient) {
		return this.patientRepository.save(patient);
	}
	
	public Patient updatePatient(Patient patient) {
		return this.patientRepository.save(patient);
	}
	
	public String deletePatient(Patient patient) {
		this.patientRepository.delete(patient);
		return "successfully deleted";
	}
	public List<Patient> getAllPatients() {
		return this.patientRepository.findAll();
	}
}
