package com.medi360.config;
 
import com.medi360.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
 
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class Security {
 
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
 
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configure(http)) // ADD THIS LINE — tells Spring Security to use CorsConfig
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
 
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
//                        .requestMatchers("/user/insertuserdata").permitAll()
//                        .requestMatchers("/api/compliance-reports/**").permitAll()
//                        .requestMatchers("/api/kpi-reports/**").permitAll()
//                        .requestMatchers("/user/findbyid/{id}").permitAll()
 
                        .requestMatchers("/api/patient/**").hasAnyRole("ADMIN", "RECEPTIONIST")
                        .requestMatchers("/user/**").hasAnyRole("ADMIN","DOCTOR","RECEPTIONIST")
                        .requestMatchers("/api/doctor/**").hasAnyRole("ADMIN", "DOCTOR","RECEPTIONIST")

                        .requestMatchers("/api/ward/**").hasAnyRole("ADMIN", "NURSE")	
                        .requestMatchers("/api/beds/**").hasAnyRole("ADMIN", "NURSE")
                        .requestMatchers("/api/appointment/**").hasAnyRole("ADMIN", "DOCTOR","RECEPTIONIST")
                        .requestMatchers("/api/compliance-reports/**").hasAnyRole("ADMIN", "COMPLIANCE_OFFICER")

                        .requestMatchers("/api/kpi-report/**").hasRole("ADMIN")

                        .requestMatchers("/api/invoice/**").hasAnyRole("ADMIN","FINANCEOFFICER")
                        .requestMatchers("/api/patientbilling/**").hasAnyRole("ADMIN","FINANCEOFFICER")
                        .requestMatchers("/notification/**").authenticated()
                        .requestMatchers("/api/insurance/**").hasAnyRole("ADMIN","FINANCEOFFICER")
                        .requestMatchers("/api/dashboard/**").hasAnyRole("ADMIN","FINANCEOFFICER")
//                         audit-logs — GET allowed, POST blocked
                        .requestMatchers(HttpMethod.GET, "/auditlog/**")
                        .hasAnyRole("ADMIN,COMPLIANCE_OFFICER")
                        .requestMatchers(HttpMethod.POST, "/auditlog/**")
                        .denyAll()
 
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);
 
        return http.build();
    }
 
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
 
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
 