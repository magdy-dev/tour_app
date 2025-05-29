package com.nmtravel.controller;

import com.nmtravel.dto.BookingCreateDto;
import com.nmtravel.dto.BookingDto;
import com.nmtravel.dto.BookingUpdateDto;
import com.nmtravel.entity.BookingStatus;
import com.nmtravel.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingDto>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @bookingService.isBookingOwner(#id, authentication.principal)")
    public ResponseEntity<BookingDto> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or authentication.principal.id == #userId")
    public ResponseEntity<List<BookingDto>> getBookingsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUser(userId));
    }

    @GetMapping("/tour/{tourId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingDto>> getBookingsByTour(@PathVariable Long tourId) {
        return ResponseEntity.ok(bookingService.getBookingsByTour(tourId));
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingDto>> getBookingsByStatus(@PathVariable BookingStatus status) {
        return ResponseEntity.ok(bookingService.getBookingsByStatus(status));
    }

    @PostMapping
    public ResponseEntity<BookingDto> createBooking(@RequestBody BookingCreateDto createDto) {
        return ResponseEntity.ok(bookingService.createBooking(createDto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @bookingService.isBookingOwner(#id, authentication.principal)")
    public ResponseEntity<BookingDto> updateBooking(@PathVariable Long id, @RequestBody BookingUpdateDto updateDto) {
        return ResponseEntity.ok(bookingService.updateBooking(id, updateDto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @bookingService.isBookingOwner(#id, authentication.principal)")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok().build();
    }
} 