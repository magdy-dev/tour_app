package com.nmtravel.controller;

import com.nmtravel.dto.TourCreateDto;
import com.nmtravel.dto.TourDto;
import com.nmtravel.dto.TourUpdateDto;
import com.nmtravel.entity.TourSection;
import com.nmtravel.entity.TourStatus;
import com.nmtravel.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tours")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TourController {

    private final TourService tourService;

    @GetMapping
    public ResponseEntity<List<TourDto>> getAllTours() {
        return ResponseEntity.ok(tourService.getAllTours());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TourDto> getTourById(@PathVariable Long id) {
        return ResponseEntity.ok(tourService.getTourById(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<TourDto>> getToursByStatus(@PathVariable TourStatus status) {
        return ResponseEntity.ok(tourService.getToursByStatus(status));
    }

    @GetMapping("/section/{section}")
    public ResponseEntity<List<TourDto>> getToursBySection(@PathVariable TourSection section) {
        return ResponseEntity.ok(tourService.getToursBySection(section));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TourDto> createTour(@RequestBody TourCreateDto createDto) {
        return ResponseEntity.ok(tourService.createTour(createDto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TourDto> updateTour(@PathVariable Long id, @RequestBody TourUpdateDto updateDto) {
        return ResponseEntity.ok(tourService.updateTour(id, updateDto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
        return ResponseEntity.ok().build();
    }
} 