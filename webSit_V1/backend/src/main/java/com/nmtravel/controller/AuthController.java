package com.nmtravel.controller;

import com.nmtravel.dto.AuthResponseDto;
import com.nmtravel.dto.UserLoginDto;
import com.nmtravel.dto.UserRegistrationDto;
import com.nmtravel.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/setup")
    public ResponseEntity<AuthResponseDto> setupAdmin() {
        return ResponseEntity.ok(authService.setupAdmin());
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@RequestBody UserRegistrationDto registrationDto) {
        return ResponseEntity.ok(authService.register(registrationDto));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody UserLoginDto loginDto) {
        return ResponseEntity.ok(authService.login(loginDto));
    }
} 