package com.medi360.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.medi360.db.PatientRepository;
import com.medi360.entities.Patient;
import com.medi360.exception.PatientNotFoundException;

@Service
public class PatientService {
	@Autowired
	PatientRepository patientRepository;

	public Patient addPatient(Patient patient) {
		return this.patientRepository.save(patient);
	}

	public Patient getPatientById(int id) throws PatientNotFoundException {

		return patientRepository.findById(id)
				.orElseThrow(() -> new PatientNotFoundException("Patient not found with id " + id));
	}

	public List<Patient> getPatientByName(String name) throws PatientNotFoundException {

		List<Patient> patients = patientRepository.findByPatientNameContainingIgnoreCase(name);

		if (patients.isEmpty()) {
			throw new PatientNotFoundException("No patient records found with name " + name);
		}

		return patients;
	}

	public Patient updatePatient(Patient patient) throws PatientNotFoundException {

		if (!patientRepository.existsById(patient.getPatientId())) {
			throw new PatientNotFoundException("Patient not found with id " + patient.getPatientId());
		}

		return this.patientRepository.save(patient);
	}

	public String deletePatient(int id) throws PatientNotFoundException {

		if (!patientRepository.existsById(id)) {
			throw new PatientNotFoundException("Patient not found with id " + id);
		}

		this.patientRepository.deleteById(id);
		return "successfully deleted";
	}

	public List<Patient> getAllPatients() {
		return this.patientRepository.findAll();
	}

	public Page<Patient> getAllPatientsWithPagination(Pageable pageable) {
		return this.patientRepository.findAll(pageable);
	}
}
