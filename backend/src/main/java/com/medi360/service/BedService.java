package com.medi360.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.medi360.db.BedRepository;
import com.medi360.entities.Bed;

@Service
public class BedService {
	private final BedRepository bedRepository;
	
	public BedService(BedRepository bedRepository) {
		this.bedRepository=bedRepository;
	}
	
	public Bed CreateBed(Bed bed) {
		return bedRepository.save(bed);
	}
	public List<Bed> getAllBeds(){
		return bedRepository.findAll();
	}
	public Bed getBedById(int bedId) {
		return bedRepository.findById(bedId).orElse(null);
	}
	public List<Bed> getBedByWard(int wardId){
		return bedRepository.findByWardId(wardId);
	}
	
	public Bed UpdateBed(int bedId,Bed updatedBed) {
		Bed existingBed=bedRepository.findById(bedId).orElse(null);
		if(existingBed!=null) {
			existingBed.setWard(updatedBed.getWard());
			existingBed.setPatient(updatedBed.getPatient());
			existingBed.setBedStatus(updatedBed.getBedStatus());
			return bedRepository.save(existingBed);
			
		}
		return null;
	}
	public void delete(int bedId) {
		bedRepository.deleteById(bedId);
		
	}

}
