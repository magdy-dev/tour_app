package com.nmtravel.dto;

import com.nmtravel.entity.BookingStatus;
import lombok.Data;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class BookingDto {
    private Long id;
    private Long tourId;
    private String tourTitle;
    private Long userId;
    private String userName;
    private LocalDate date;
    private LocalTime time;
    private String customerName;
    private String email;
    private String phone;
    private Integer numberOfGuests;
    private BigDecimal totalPrice;
    private BookingStatus status;
    private String specialRequests;
} 