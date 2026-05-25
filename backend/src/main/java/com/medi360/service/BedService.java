package com.medi360.service;

import org.springframework.data.domain.Pageable;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medi360.db.BedRepository;
import com.medi360.db.WardRepository; // ADD THIS
import com.medi360.entities.Bed;
import com.medi360.entities.Patient;
import com.medi360.entities.Ward; // ADD THIS
import com.medi360.exception.BedNotFoundException;

@Service
public class BedService {

	@Autowired
	private BedRepository bedRepository;

	@Autowired
	private WardRepository wardRepository; // ADD THIS

	public BedService(BedRepository bedRepository) {
		this.bedRepository = bedRepository;
	}

	// REPLACE the old createBed with this
	public Bed createBed(Bed bed) {

		// 1. Ward must be provided
		if (bed.getWard() == null || bed.getWard().getWardId() == 0) {
			throw new IllegalArgumentException("Ward ID is required to create a bed.");
		}

		int wardId = bed.getWard().getWardId();

		// 2. Ward must exist in DB
		Ward ward = wardRepository.findById(wardId)
				.orElseThrow(() -> new IllegalArgumentException("Ward not found with id " + wardId));

		// 3. Check capacity — count existing beds in this ward
		List<Bed> existingBeds = bedRepository.findByWard_WardId(wardId);
		if (existingBeds.size() >= ward.getWardcapacity()) {
			throw new IllegalStateException("Ward " + ward.getWardname() + " is full. Capacity: "
					+ ward.getWardcapacity() + ", Current beds: " + existingBeds.size());
		}

		// 4. Link the full ward object and save
		bed.setWard(ward);
		return bedRepository.save(bed);
	}

	// --- everything below stays exactly the same ---

	public List<Bed> getAllBeds() {
		return bedRepository.findAll();
	}

	public Bed getBedById(int bedId) {
		return bedRepository.findById(bedId).orElse(null);
	}

	public List<Bed> getBedByWard(int wardId) {
		return bedRepository.findByWard_WardId(wardId);
	}

	public Bed updateBed(Bed bed) throws BedNotFoundException {
		if (!bedRepository.existsById(bed.getBedId())) {
			throw new BedNotFoundException("Bed not found with id " + bed.getBedId());
		}
		return bedRepository.save(bed);
	}

	public void delete(int bedId) throws BedNotFoundException {
		if (!bedRepository.existsById(bedId)) {
			throw new BedNotFoundException("Bed not found with id " + bedId);
		}
		bedRepository.deleteById(bedId);
	}

	public Page<Bed> getAllBedsWithPaginated(Pageable pageable) {
		return this.bedRepository.findAll(pageable);
	}

	public Bed assignPatientToBed(int bedId, Patient patient) throws BedNotFoundException {
		Bed bed = bedRepository.findById(bedId)
				.orElseThrow(() -> new BedNotFoundException("Bed not found with id " + bedId));
		if ("OCCUPIED".equalsIgnoreCase(bed.getBedStatus())) {
			throw new IllegalStateException("Bed " + bedId + " is already occupied.");
		}
		bed.setPatient(patient);
		bed.setBedStatus("OCCUPIED");
		return bedRepository.save(bed);
	}

	public Bed dischargePatient(int bedId) throws BedNotFoundException {
		Bed bed = bedRepository.findById(bedId)
				.orElseThrow(() -> new BedNotFoundException("Bed not found with id " + bedId));
		bed.setPatient(null);
		bed.setBedStatus("AVAILABLE");
		return bedRepository.save(bed);
	}
}