package com.nmtravel.dto;

import lombok.Data;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class BookingCreateDto {
    private Long tourId;
    private LocalDate date;
    private LocalTime time;
    private String customerName;
    private String email;
    private String phone;
    private Integer numberOfGuests;
    private String specialRequests;
} 