package com.nmtravel.service;

import com.nmtravel.dto.BookingCreateDto;
import com.nmtravel.dto.BookingDto;
import com.nmtravel.dto.BookingUpdateDto;
import com.nmtravel.entity.Booking;
import com.nmtravel.entity.BookingStatus;
import com.nmtravel.entity.Tour;
import com.nmtravel.entity.User;
import com.nmtravel.repository.BookingRepository;
import com.nmtravel.repository.TourRepository;
import com.nmtravel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final TourRepository tourRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BookingDto> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BookingDto> getBookingsByTour(Long tourId) {
        return bookingRepository.findByTourId(tourId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BookingDto> getBookingsByStatus(BookingStatus status) {
        return bookingRepository.findByStatus(status).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BookingDto getBookingById(Long id) {
        return bookingRepository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    @Transactional
    public BookingDto createBooking(BookingCreateDto createDto) {
        Tour tour = tourRepository.findById(createDto.getTourId())
                .orElseThrow(() -> new RuntimeException("Tour not found"));

        if (tour.getStatus() != com.nmtravel.entity.TourStatus.ACTIVE) {
            throw new RuntimeException("Cannot book inactive tour");
        }

        Booking booking = Booking.builder()
                .tour(tour)
                .date(createDto.getDate())
                .time(createDto.getTime())
                .customerName(createDto.getCustomerName())
                .email(createDto.getEmail())
                .phone(createDto.getPhone())
                .numberOfGuests(createDto.getNumberOfGuests())
                .totalPrice(tour.getPrice().multiply(new java.math.BigDecimal(createDto.getNumberOfGuests())))
                .status(BookingStatus.PENDING)
                .specialRequests(createDto.getSpecialRequests())
                .build();

        booking = bookingRepository.save(booking);
        return mapToDto(booking);
    }

    @Transactional
    public BookingDto updateBooking(Long id, BookingUpdateDto updateDto) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setDate(updateDto.getDate());
        booking.setTime(updateDto.getTime());
        booking.setCustomerName(updateDto.getCustomerName());
        booking.setEmail(updateDto.getEmail());
        booking.setPhone(updateDto.getPhone());
        booking.setNumberOfGuests(updateDto.getNumberOfGuests());
        booking.setTotalPrice(booking.getTour().getPrice().multiply(new java.math.BigDecimal(updateDto.getNumberOfGuests())));
        booking.setStatus(updateDto.getStatus());
        booking.setSpecialRequests(updateDto.getSpecialRequests());

        booking = bookingRepository.save(booking);
        return mapToDto(booking);
    }

    @Transactional
    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new RuntimeException("Booking not found");
        }
        bookingRepository.deleteById(id);
    }

    public boolean isBookingOwner(Long bookingId, Authentication authentication) {
        return bookingRepository.findById(bookingId)
                .map(booking -> booking.getUser() != null && 
                     booking.getUser().getEmail().equals(authentication.getName()))
                .orElse(false);
    }

    private BookingDto mapToDto(Booking booking) {
        return BookingDto.builder()
                .id(booking.getId())
                .tourId(booking.getTour().getId())
                .tourTitle(booking.getTour().getTitle())
                .userId(booking.getUser() != null ? booking.getUser().getId() : null)
                .userName(booking.getUser() != null ? booking.getUser().getFullName() : null)
                .date(booking.getDate())
                .time(booking.getTime())
                .customerName(booking.getCustomerName())
                .email(booking.getEmail())
                .phone(booking.getPhone())
                .numberOfGuests(booking.getNumberOfGuests())
                .totalPrice(booking.getTotalPrice())
                .status(booking.getStatus())
                .specialRequests(booking.getSpecialRequests())
                .build();
    }
} 