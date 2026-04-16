package com.medi360.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medi360.db.UserRepository;
import com.medi360.entities.User;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userrepo;
	
//	public User insertUsers(User u) {
//		
//	}
}
