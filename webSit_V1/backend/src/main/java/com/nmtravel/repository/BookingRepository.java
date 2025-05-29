package com.nmtravel.repository;

import com.nmtravel.entity.Booking;
import com.nmtravel.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByTourId(Long tourId);
    List<Booking> findByStatus(BookingStatus status);
    List<Booking> findByDate(LocalDate date);
    List<Booking> findByUserIdAndStatus(Long userId, BookingStatus status);
    List<Booking> findByTourIdAndStatus(Long tourId, BookingStatus status);
} 