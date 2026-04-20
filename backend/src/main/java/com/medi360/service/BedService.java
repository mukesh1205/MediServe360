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
	
	public Bed createBed(Bed bed) {
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
	
	public Bed updateBed(Bed bed) {
		return bedRepository.save(bed);
		
	}
	public void delete(int bedId) {
		bedRepository.deleteById(bedId);
		
	}

}
