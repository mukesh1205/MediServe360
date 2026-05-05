package com.medi360.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.medi360.db.AuditlogRepository;
import com.medi360.db.UserRepository;
import com.medi360.entities.AuditLog;
import com.medi360.entities.User;
import com.medi360.exception.PatientNotFoundException;
import com.medi360.exception.UserNotFoundException;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userrepo;
	@Autowired
	private AuditlogRepository auditrepo;
	
	public void addUserAuditLog(AuditLog au) {
		this.auditrepo.save(au);
	}
	public User addUser(User user) {
		User u=this.userrepo.save(user);
		AuditLog au=new AuditLog();
		au.setAction("User with Name "+u.getUserName()+" and Role "+u.getUserRole()+" successfully created");
		au.setTimestamp(LocalDateTime.now());
		au.setUser(u);
		
		addUserAuditLog(au);
		return u;
	}
	
	public User updateUser(User user) throws UserNotFoundException{
		if (!userrepo.existsById(user.getUserId())) {
			throw new UserNotFoundException("User not found with id " + user.getUserId());
		}
		User u=this.userrepo.save(user);
		AuditLog au=new AuditLog();
		au.setAction("User with Name "+u.getUserName()+" and Role "+u.getUserRole()+" successfully updated");
		au.setTimestamp(LocalDateTime.now());
		au.setUser(u);
		
		auditrepo.save(au);
		
		
		
		return u;
		
	}
	
	public String deleteUser(int id) throws UserNotFoundException{
		if (!userrepo.existsById(id)) {
			throw new UserNotFoundException("User not found with id " + id);
		}
		
		this.userrepo.deleteById(id);
		
		return "Successfully Deleted";
	}
	
	public List<User> getAllUser(){
		return this.userrepo.findAll();
	}
	
	public Page<User> getAllUsersWithPagination(Pageable pageable) {
		return this.userrepo.findAll(pageable);
	}
	
	public User findById(int id) throws UserNotFoundException{
		if (!userrepo.existsById(id)) {
			throw new UserNotFoundException("User not found with id " + id);
		}
		return this.userrepo.findById(id).orElseThrow();
	}
	
	
}
