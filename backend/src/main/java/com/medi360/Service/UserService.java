package com.medi360.Service;

import org.springframework.beans.factory.annotation.Autowired;

import com.medi360.Repository.UserRepository;

public class UserService {
	
	@Autowired
	private UserRepository userrepo;
}
