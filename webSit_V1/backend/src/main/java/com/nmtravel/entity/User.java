package com.nmtravel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "full_name")
    private String fullName;

    private String phone;
    private String whatsapp;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private UserRole role = UserRole.USER;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    @Builder.Default
    private Set<String> roles = new HashSet<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Booking> bookings = new HashSet<>();
    
    @Builder.Default
    private boolean enabled = true;
    
    @PostLoad
    @PostPersist
    public void initializeRoles() {
        if (roles.isEmpty()) {
            roles.add("ROLE_" + role.name());
        }
    }
    
    public void addRole(String role) {
        roles.add(role);
    }
    
    public void removeRole(String role) {
        roles.remove(role);
    }
} 