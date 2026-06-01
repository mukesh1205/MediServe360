package com.medi360.service;

import org.springframework.data.domain.Pageable;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.medi360.db.BedRepository;
import com.medi360.db.WardRepository;
import com.medi360.entities.Bed;
import com.medi360.entities.Patient;
import com.medi360.entities.Ward;
import com.medi360.exception.BedNotFoundException;

@Service
public class BedService {

    @Autowired
    private BedRepository bedRepository;

    @Autowired
    private WardRepository wardRepository;

    public BedService(BedRepository bedRepository) {
        this.bedRepository = bedRepository;
    }

    public Bed createBed(Bed bed) {
        if (bed.getWard() == null || bed.getWard().getWardId() == 0) {
            throw new IllegalArgumentException("Ward ID is required to create a bed.");
        }
        int wardId = bed.getWard().getWardId();
        Ward ward = wardRepository.findById(wardId)
                .orElseThrow(() -> new IllegalArgumentException("Ward not found with id " + wardId));
        List<Bed> existingBeds = bedRepository.findByWard_WardId(wardId);
        if (existingBeds.size() >= ward.getWardcapacity()) {
            throw new IllegalStateException("Ward " + ward.getWardname() + " is full. Capacity: "
                    + ward.getWardcapacity() + ", Current beds: " + existingBeds.size());
        }
        bed.setWard(ward);
        return bedRepository.save(bed);
    }

    public List<Bed> getAllBeds() {
        return bedRepository.findAll();
    }

    public Bed getBedById(int bedId) {
        return bedRepository.findById(bedId).orElse(null);
    }

    public List<Bed> getBedByWard(int wardId) {
        return bedRepository.findByWard_WardId(wardId);
    }

    // ✅ FIXED: fetch existing bed first, update only changed fields
    public Bed updateBed(Bed bed) throws BedNotFoundException {
        Bed existingBed = bedRepository.findById(bed.getBedId())
                .orElseThrow(() -> new BedNotFoundException("Bed not found with id " + bed.getBedId()));

        // Update bedStatus if provided
        if (bed.getBedStatus() != null) {
            existingBed.setBedStatus(bed.getBedStatus());
        }

        // Update ward only if provided — fetch full Ward entity to avoid JPA partial object error
        if (bed.getWard() != null && bed.getWard().getWardId() != 0) {
            Ward ward = wardRepository.findById(bed.getWard().getWardId())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Ward not found with id " + bed.getWard().getWardId()));
            existingBed.setWard(ward);
        }

        // Patient is intentionally NOT touched — preserved from existing record

        return bedRepository.save(existingBed);
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