
package com.medi360.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.medi360.db.WardRepository;
import com.medi360.entities.Ward;

@Service
public class WardService {
	@Autowired
	private  WardRepository wardRepository;
	
	public WardService(WardRepository wardRepository) {
		this.wardRepository=wardRepository;
	}
	
	public Ward createWard(Ward ward) {
		return wardRepository.save(ward);
	}
	public List<Ward> getAllWard(){
		return wardRepository.findAll();
	}
	public Ward getWardById(int wardId) {
		return wardRepository.findById(wardId).orElse(null);
	}
	public Ward updateWard(Ward ward) {
		return wardRepository.save(ward);
	}
	public void deleteWard(int wardId) {
		wardRepository.deleteById(wardId);
	}
	public Page<Ward>getAllWardsWithPaginated(Pageable pageable){
		return this.wardRepository.findAll(pageable);
	}
	

}
