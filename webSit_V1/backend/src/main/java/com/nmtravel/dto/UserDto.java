package com.nmtravel.dto;

import lombok.Data;
import lombok.Builder;

import java.util.Set;

@Data
@Builder
public class UserDto {
    private Long id;
    private String email;
    private String fullName;
    private String phone;
    private String whatsapp;
    private Set<String> roles;
    private boolean enabled;
} 