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
import org.springframework.security.core.Authentication;

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
		System.out.println(userDto.getPassword());
		return ResponseEntity.ok(us.addUser(userDto));
	}
	
	@GetMapping("approval/{a}/{id}")
	public ResponseEntity<UserResponseDTO> userApproval(@PathVariable String a,@PathVariable int id){
		System.out.println(id+" "+a);
		return ResponseEntity.ok(us.userApproval(a,id));
	}

	@PutMapping("/updateuser/{id}")
	public ResponseEntity<UserResponseDTO> updateUser(@PathVariable int id, @RequestBody UserDTO userDto) {
		System.out.println(id);
		return ResponseEntity.ok(us.updateUser(id, userDto));
	}

	@DeleteMapping("/deleteuser/{id}")
	public String deleteUser(@PathVariable int id) throws UserNotFoundException {
		System.out.println(id);
		return this.us.deleteUser(id);
	}

	@GetMapping("/fetchallusers")
	public ResponseEntity<List<UserResponseDTO>> getAllUser() {
		return ResponseEntity.ok(us.getAllUser());
	}
	
	@GetMapping("/fetchAllUsersPaginated")
	public Page<User> f6(@RequestParam(name = "pgno") int pgno, @RequestParam(name = "size") int size,
			@RequestParam(name = "sorting") String sorting, @RequestParam(name = "asc") boolean asc) {
		Sort sort = asc ? Sort.by(sorting).ascending() : Sort.by(sorting).descending();

		Pageable pageable = PageRequest.of(pgno, size, sort);
		return this.us.getAllUsersWithPagination(pageable);
	}

	@GetMapping("/findbyid/{id}")
	public ResponseEntity<UserResponseDTO> findById(@PathVariable int id) throws UserNotFoundException {

		return ResponseEntity.ok(us.findById(id));
	}

	@GetMapping("/myProfile")
	public ResponseEntity<?> getMyProfile(Authentication authentication) {

		if (authentication == null) {
			return ResponseEntity.status(401).body("User not authenticated");
		}

		String email = authentication.getName();
		UserResponseDTO user = us.getUserByEmail(email);

		return ResponseEntity.ok(user);
	}

	public UserResponseDTO userresponse(User u) {
		UserResponseDTO udto = new UserResponseDTO();
		udto.setEmail(u.getUserEmail());
		udto.setPhoneNumber(u.getUserPhone());
		udto.setRole(u.getUserRole());
		udto.setUserId(u.getUserId());
		udto.setUserName(u.getUserName());

		return udto;

	}

}
