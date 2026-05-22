package com.medi360.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medi360.DTO.UserDTO;
import com.medi360.DTO.UserResponseDTO;
import com.medi360.entities.User;
import com.medi360.exception.UserNotFoundException;
import com.medi360.service.UserService;


@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService us;
	
	@PostMapping("/insertuserdata")
	public ResponseEntity<UserResponseDTO> addUser(@RequestBody UserDTO userDto) {
		
		
		User u=this.us.addUser(userDto.getUser());
		UserResponseDTO urd=new UserResponseDTO();
		
		urd.setUser(u);
		urd.setStatusCode(201);
		urd.setMessage("Successfully added");
		
		return ResponseEntity.status(201).body(urd);
	}
	
	@PutMapping("/updateuser")
	public ResponseEntity<UserResponseDTO> updateUser(@RequestBody UserDTO userDto) throws UserNotFoundException{
		
		User u=this.us.updateUser(userDto.getUser());
		UserResponseDTO urd=new UserResponseDTO();
		
		urd.setUser(u);
		urd.setMessage("Successfully updated user");
		urd.setStatusCode(200);
		
		return ResponseEntity.status(200).body(urd);
	}
	
	@DeleteMapping("/deleteuser/{uid}")
	public String deleteUser(@PathVariable int uid) throws UserNotFoundException{
		
		return this.us.deleteUser(uid);
	}
	
	@GetMapping("/fetchallusers")
	public List<User> getAllUser(){
		return this.us.getAllUser();
	}
	
	@GetMapping("/fetchAllUsersPaginated")
	public Page<User> f6(@RequestParam(name="pgno") int pgno,
							@RequestParam(name="size") int size,
							@RequestParam(name="sorting") String sorting,
							@RequestParam(name="asc") boolean asc){
		Sort sort=asc?Sort.by(sorting).ascending() : Sort.by(sorting).descending();
		
		Pageable pageable=PageRequest.of(pgno, size,sort);
		return this.us.getAllUsersWithPagination(pageable);
	}
	
	@GetMapping("/findbyid/{id}")
	public ResponseEntity<UserResponseDTO> findById(@PathVariable int id) throws UserNotFoundException{
		User u=this.us.findById(id);
		UserResponseDTO dto=new UserResponseDTO();
		
		dto.setUser(u);
		dto.setStatusCode(200);
		dto.setMessage("Successfully retreived data by userid");
		
		return ResponseEntity.status(200).body(dto);
	}
	
	
	
}
