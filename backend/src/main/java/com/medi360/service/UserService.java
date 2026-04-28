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
	
	public User insertUsers(User u) {
		return this.userrepo.save(u);
	}
	public User updateUsers(User u) {
		return this.userrepo.save(u);
	}
	
	public String deleteUser(int id) {
		this.userrepo.deleteById(id);
		return "successfully deleted";
	}
	public List<User> getAllUsers() {
		return this.userrepo.findAll();
	}
	
	public Page<User> getAllUsersWithPagination(Pageable pageable) {
		return this.userrepo.findAll(pageable);
	}
}
