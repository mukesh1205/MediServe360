
package com.medi360.service;

import org.springframework.data.domain.Pageable;
import java.util.List;

import org.springframework.data.domain.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medi360.db.BedRepository;
import com.medi360.entities.Bed;
import com.medi360.exception.BedNotFoundException;

@Service
public class BedService {
	@Autowired
	private  BedRepository bedRepository;
	
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
		return bedRepository.findByWard_WardId(wardId);
	}
	
	public Bed updateBed(Bed bed) throws BedNotFoundException {
		if (!bedRepository.existsById(bed.getBedId())){
			throw new BedNotFoundException("Bed not found with id " + bed.getBedId());
		}

		return bedRepository.save(bed);
		
	}
	public void delete(int bedId) throws BedNotFoundException{

		if (!bedRepository.existsById(bedId)) {
			throw new BedNotFoundException("Bed not found with id " + bedId);
		}

		bedRepository.deleteById(bedId);
		
	}
	public Page<Bed> getAllBedsWithPaginated(Pageable pageable){
		return this.bedRepository.findAll(pageable);
		}

}
