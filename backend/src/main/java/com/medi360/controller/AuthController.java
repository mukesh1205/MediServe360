package com.medi360.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medi360.DTO.LoginRequestDTO;
import com.medi360.DTO.LoginResponseDTO;
import com.medi360.DTO.RegisterRequestDTO;
import com.medi360.DTO.UserResponseDTO;
import com.medi360.service.AuthService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private AuthService aser;
	
	@PostMapping("/register")
	public ResponseEntity<UserResponseDTO> register(@RequestBody RegisterRequestDTO dto) {
		System.out.println(dto.getEmail());
		System.out.println(dto.getPassword());
	    return ResponseEntity.ok(aser.register(dto));
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO dto) {
	    return ResponseEntity.ok(aser.login(dto));
	}
	
	@PutMapping("/updatepassword/{email}/{password}")
	public String updatePassword(@PathVariable String email,@PathVariable String password) {
		System.out.println(email+" "+password);
		return this.aser.updatePassword(email,password);
	}
	
}
