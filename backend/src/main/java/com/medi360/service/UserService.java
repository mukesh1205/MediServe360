package com.medi360.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.medi360.db.UserRepository;
import com.medi360.entities.Patient;
import com.medi360.entities.User;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userrepo;
	
	public User addUser(User user) {
		return this.userrepo.save(user);
	}
	
	public User updateUser(User user) {
		return this.userrepo.save(user);
	}
	
	public String deleteUser(int id) {
		this.userrepo.deleteById(id);
		return "Successfully Deleted";
	}
	
	public List<User> getAllUser(){
		return this.userrepo.findAll();
	}
	
	public Page<User> getAllUsersWithPagination(Pageable pageable) {
		return this.userrepo.findAll(pageable);
	}
}
