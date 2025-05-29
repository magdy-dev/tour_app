package com.nmtravel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@SuperBuilder
public class Booking extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private LocalDate date;
    
    @Column(nullable = false)
    private LocalTime time;
    
    @Column(nullable = false)
    private String customerName;
    
    @Column(nullable = false)
    private String email;
    
    private String phone;
    
    @Column(nullable = false)
    private Integer numberOfGuests;
    
    @Column(nullable = false)
    private BigDecimal totalPrice;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status;
    
    @Column(length = 1000)
    private String specialRequests;
    
    public Booking() {
        this.status = BookingStatus.PENDING;
    }
} 