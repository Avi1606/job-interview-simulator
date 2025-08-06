package com.interviewsimulator.controller;

import com.interviewsimulator.dto.LoginRequest;
import com.interviewsimulator.dto.RegisterRequest;
import com.interviewsimulator.model.User;
import com.interviewsimulator.repository.UserRepository;
import com.interviewsimulator.security.JwtTokenProvider;
import com.interviewsimulator.security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwt = jwtTokenProvider.generateToken(userDetails);
            String refreshToken = jwtTokenProvider.generateRefreshToken(userDetails);

            // Get user details
            User user = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);

            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("refreshToken", refreshToken);
            response.put("type", "Bearer");
            response.put("user", Map.of(
                    "id", user.getId(),
                    "email", user.getEmail(),
                    "firstName", user.getFirstName(),
                    "lastName", user.getLastName(),
                    "role", user.getRole(),
                    "stats", user.getStats()
            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Invalid email or password");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            // Check if user already exists
            if (userRepository.existsByEmail(registerRequest.getEmail())) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Email is already taken!");
                return ResponseEntity.badRequest().body(response);
            }

            // Create new user
            User user = new User();
            user.setFirstName(registerRequest.getFirstName());
            user.setLastName(registerRequest.getLastName());
            user.setEmail(registerRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

            User savedUser = userRepository.save(user);

            // Generate tokens
            UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getEmail());
            String jwt = jwtTokenProvider.generateToken(userDetails);
            String refreshToken = jwtTokenProvider.generateRefreshToken(userDetails);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully!");
            response.put("token", jwt);
            response.put("refreshToken", refreshToken);
            response.put("type", "Bearer");
            response.put("user", Map.of(
                    "id", savedUser.getId(),
                    "email", savedUser.getEmail(),
                    "firstName", savedUser.getFirstName(),
                    "lastName", savedUser.getLastName(),
                    "role", savedUser.getRole(),
                    "stats", savedUser.getStats()
            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Error: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.substring(7); // Remove "Bearer " prefix
            String email = jwtTokenProvider.extractUsername(jwt);
            User user = userRepository.findByEmail(email).orElse(null);

            if (user != null && jwtTokenProvider.validateToken(jwt)) {
                Map<String, Object> response = new HashMap<>();
                response.put("user", Map.of(
                        "id", user.getId(),
                        "email", user.getEmail(),
                        "firstName", user.getFirstName(),
                        "lastName", user.getLastName(),
                        "role", user.getRole(),
                        "stats", user.getStats()
                ));
                return ResponseEntity.ok(response);
            }

            return ResponseEntity.badRequest().body(Map.of("message", "Invalid token"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Token verification failed"));
        }
    }
}