package com.nmtravel.dto;

import com.nmtravel.entity.BookingStatus;
import lombok.Data;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class BookingUpdateDto {
    private LocalDate date;
    private LocalTime time;
    private String customerName;
    private String email;
    private String phone;
    private Integer numberOfGuests;
    private BookingStatus status;
    private String specialRequests;
} 