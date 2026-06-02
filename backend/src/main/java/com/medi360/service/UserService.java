package com.medi360.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.medi360.DTO.UserDTO;
import com.medi360.DTO.UserResponseDTO;
import com.medi360.db.AuditlogRepository;
import com.medi360.db.UserRepository;
import com.medi360.entities.User;
import com.medi360.exception.BadRequestException;
import com.medi360.exception.ResourceNotFoundException;
import com.medi360.exception.UserNotFoundException;

@Service
@RestControllerAdvice
public class UserService {
	
	@Autowired
	private UserRepository userrepo;
	@Autowired
	private AuditlogService auditservice;
	@Autowired
	private PasswordEncoder passwordencoder;
	
	@Autowired
	private AuditlogRepository auditlogrepository;
//	public void addUserAuditLog(AuditLog au) {
//		this.auditrepo.save(au);
//	}
	public UserResponseDTO addUser(UserDTO userDto) {
		System.out.println(userDto.getUserEmail());
		if (userrepo.existsByEmail(userDto.getUserEmail())) {
		    auditservice.logFailure("User.CREATE",
		            "Duplicate email: " + userDto.getUserEmail());
		    throw new BadRequestException("Email already registered: " + userDto.getUserEmail());
		}
		try {
		    User user = mapToEntity(userDto);
		    UserResponseDTO result = mapToDTO(userrepo.save(user));


		    auditservice.log("User.CREATE_SUCCESS | UserID: " + result.getUserId()
		            + " | Name: " + result.getUserName()
		            + " | Role: " + result.getRole()
		            + " | Email: " + result.getEmail());
		    return result;
		} catch (Exception ex) {
		    auditservice.logFailure("User.CREATE", ex.getMessage());
		    throw ex;
		}
//		User u=this.userrepo.save(user);
//		AuditLog au=new AuditLog();
//		au.setAction("User with Name "+u.getUserName()+" and Role "+u.getUserRole()+" successfully created");
//		au.setTimestamp(LocalDateTime.now());
//		au.setUser(u);
//		
//		addUserAuditLog(au);
//		return u;
	}
	
	public UserResponseDTO updateUser(int id,UserDTO dto){
		User user = userrepo.findById(id)
		        .orElseThrow(() -> new ResourceNotFoundException(
		                "User not found with ID: " + id));

		String before = "Name: " + user.getUserName()
		        + " | Role: " + user.getUserRole()
		        + " | Phone: " + user.getUserPhone();

		try {
		    user.setUserName(dto.getUserName());
		    user.setUserRole(dto.getUserRole());
		    user.setUserPhone(dto.getPhonenumber());

		    // Re-hash password only if a new one is provided
		    if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
		        user.setPassword(passwordencoder.encode(dto.getPassword()));
		    }

		    UserResponseDTO result = mapToDTO(userrepo.save(user));
		    auditservice.log("User.UPDATE_SUCCESS | UserID: " + id
		            + " | Before: " + before
		            + " | After: Name: " + dto.getUserName()
		            + " | Role: " + dto.getUserRole()
		            + " | Phone: " + dto.getPhonenumber());
		    return result;
		} catch (Exception ex) {
		    auditservice.logFailure("User.UPDATE", ex.getMessage());
		    throw ex;
		}
//		if (!userrepo.existsById(user.getUserId())) {
//			throw new UserNotFoundException("User not found with id " + user.getUserId());
//		}
//		User u=this.userrepo.save(user);
//		AuditLog au=new AuditLog();
//		au.setAction("User with Name "+u.getUserName()+" and Role "+u.getUserRole()+" successfully updated");
//		au.setTimestamp(LocalDateTime.now());
//		au.setUser(u);
//		
//		auditrepo.save(au);
//		
//		
//		
//		return u;
		
	}
	
	public String deleteUser(int id) throws UserNotFoundException {
	    User user = userrepo.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
	    try {
	    		auditlogrepository.deleteByUserUserId(id); 
	        userrepo.deleteById(id);
	        auditservice.log("User.DELETE_SUCCESS | UserID: " + id
	                + " | Name: " + user.getUserName()
	                + " | Email: " + user.getUserEmail()
	                + " | Role: " + user.getUserRole());
	        return "Successfully Deleted";
	    } catch (Exception ex) {
	        auditservice.logFailure("User.DELETE", ex.getMessage());
	        throw ex;
	    }
	}
	
	public List<UserResponseDTO> getAllUser(){
		return this.userrepo.findAll().stream()
				.map(this::mapToDTO).collect(Collectors.toList());
	}
	
	public Page<User> getAllUsersWithPagination(Pageable pageable) {
		return this.userrepo.findAll(pageable);
	}
	
	public UserResponseDTO findById(int id) throws UserNotFoundException{
		User user = userrepo.findById(id)
		        .orElseThrow(() -> new ResourceNotFoundException(
		                "User not found with ID: " + id));
		UserResponseDTO uu=new UserResponseDTO();
		uu=mapToDTO(user);
		return uu;
	}
	
	private User mapToEntity(UserDTO dto) {
	    User user = new User();
	    user.setUserName(dto.getUserName());
	    user.setUserRole(dto.getUserRole());
	    user.setUserEmail(dto.getUserEmail());
	    user.setUserPhone(dto.getPhonenumber());
	    user.setPassword(passwordencoder.encode(dto.getPassword())); // hashed
	    return user;
	}

	private UserResponseDTO mapToDTO(User u) {
	    UserResponseDTO dto = new UserResponseDTO();
	    dto.setUserId(u.getUserId());
	    dto.setUserName(u.getUserName());
	    dto.setRole(u.getUserRole());
	    dto.setEmail(u.getUserEmail());
	    dto.setPhoneNumber(u.getUserPhone());
	    return dto;
	}
}
