package com.medi360.WardBedManagenment.Bed;

import com.medi360.PatientDoctorRegestration.Patient.Patient;
import com.medi360.WardBedManagenment.Ward.Ward;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Bed {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int bedId;
	@ManyToOne
	@JoinColumn(name="ward_id")
	private Ward ward;
	
	@OneToOne
	private Patient patient;
	private String bedStatus;
	public int getBedId() {
		return bedId;
	}
	public void setBedId(int bedId) {
		this.bedId = bedId;
	}
	public Ward getWard() {
		return ward;
	}
	public void setWard(Ward ward) {
		this.ward = ward;
	}
	public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	public String getBedStatus() {
		return bedStatus;
	}
	public void setBedStatus(String bedStatus) {
		this.bedStatus = bedStatus;
	}
	public Bed(Ward ward, Patient patient, String bedStatus) {
		super();
		this.ward = ward;
		this.patient = patient;
		this.bedStatus = bedStatus;
	}
	public Bed() {
		super();
	}
	
}
