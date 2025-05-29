package com.nmtravel.service;

import com.nmtravel.dto.*;
import com.nmtravel.entity.User;
import com.nmtravel.entity.UserRole;
import com.nmtravel.repository.UserRepository;
import com.nmtravel.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public AuthResponseDto register(UserRegistrationDto registrationDto) {
        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .email(registrationDto.getEmail())
                .password(passwordEncoder.encode(registrationDto.getPassword()))
                .fullName(registrationDto.getFullName())
                .phone(registrationDto.getPhone())
                .whatsapp(registrationDto.getWhatsapp())
                .build();

        user = userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        registrationDto.getEmail(),
                        registrationDto.getPassword()
                )
        );

        String token = tokenProvider.generateToken(authentication);
        return AuthResponseDto.builder()
                .token(token)
                .user(mapToDto(user))
                .build();
    }

    public AuthResponseDto login(UserLoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return AuthResponseDto.builder()
                .token(token)
                .user(mapToDto(user))
                .build();
    }

    @Transactional
    public AuthResponseDto setupAdmin() {
        // Check if admin already exists
        if (userRepository.existsByEmail("admin@nmtravel.com")) {
            throw new RuntimeException("Admin user already exists");
        }

        // Create admin user
        User admin = User.builder()
                .email("admin@nmtravel.com")
                .password(passwordEncoder.encode("marko123456789"))
                .fullName("Admin User")
                .role(UserRole.ADMIN)
                .build();

        admin = userRepository.save(admin);

        // Generate token
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        admin.getEmail(),
                        "marko123456789"
                )
        );

        String token = tokenProvider.generateToken(authentication);
        return AuthResponseDto.builder()
                .token(token)
                .user(mapToDto(admin))
                .build();
    }

    private UserDto mapToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .whatsapp(user.getWhatsapp())
                .roles(user.getRoles())
                .enabled(user.isEnabled())
                .build();
    }
}