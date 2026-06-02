package com.medi360.service;

import com.medi360.db.UserRepository;
import com.medi360.DTO.LoginRequestDTO;
import com.medi360.DTO.LoginResponseDTO;
import com.medi360.DTO.RegisterRequestDTO;
import com.medi360.DTO.UserResponseDTO;
import com.medi360.exception.BadRequestException;
import com.medi360.entities.User;
import com.medi360.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuditlogService auditLogService;


    public UserResponseDTO register(RegisterRequestDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            auditLogService.log(
                    "AUTH.REGISTER_FAILED | Error: Email already registered: " + dto.getEmail());
            throw new BadRequestException("Email already registered: " + dto.getEmail());
        }

        User user = new User();
        user.setUserName(dto.getUserName());
        user.setUserEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setUserRole(dto.getRole());
        user.setUserPhone(dto.getPhoneNumber());

        User saved = userRepository.save(user);

        auditLogService.log(
                "AUTH.REGISTER_SUCCESS | UserID: " + saved.getUserId()
                        + " | Email: " + saved.getUserEmail()
                        + " | Role: " + saved.getUserRole(),
                saved.getUserEmail());

        UserResponseDTO response = new UserResponseDTO();
        response.setUserId(saved.getUserId());
        response.setUserName(saved.getUserName());
        response.setEmail(saved.getUserEmail());
        response.setRole(saved.getUserRole());
        response.setPhoneNumber(saved.getUserPhone());
        return response;
    }


    public LoginResponseDTO login(LoginRequestDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail()).orElse(null);


        if (user == null) {

            auditLogService.log(
                    "AUTH.LOGIN_FAILED | Error: No account found for email: " + dto.getEmail());
            throw new BadRequestException("Invalid email or password");
        }


        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            auditLogService.logFailure(
                    "AUTH.LOGIN",
                    "Wrong password for email: " + dto.getEmail(),
                    dto.getEmail());
            throw new BadRequestException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getUserEmail(), user.getUserRole());

        auditLogService.log(
                "AUTH.LOGIN_SUCCESS | Email: " + user.getUserEmail()
                        + " | Role: " + user.getUserRole(),
                user.getUserEmail());

        LoginResponseDTO response = new LoginResponseDTO();
        response.setToken(token);
        response.setEmail(user.getUserEmail());
        response.setRole(user.getUserRole());
        response.setUserName(user.getUserName());
        response.setUserId(user.getUserId());
        return response;
    }
}