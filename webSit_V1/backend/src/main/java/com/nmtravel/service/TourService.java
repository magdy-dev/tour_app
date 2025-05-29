package com.nmtravel.service;

import com.nmtravel.dto.TourCreateDto;
import com.nmtravel.dto.TourDto;
import com.nmtravel.dto.TourUpdateDto;
import com.nmtravel.entity.Tour;
import com.nmtravel.entity.TourSection;
import com.nmtravel.entity.TourStatus;
import com.nmtravel.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TourService {

    private final TourRepository tourRepository;

    @Transactional(readOnly = true)
    public List<TourDto> getAllTours() {
        return tourRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TourDto> getToursByStatus(TourStatus status) {
        return tourRepository.findByStatus(status).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TourDto> getToursBySection(TourSection section) {
        return tourRepository.findBySection(section).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TourDto getTourById(Long id) {
        return tourRepository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new RuntimeException("Tour not found"));
    }

    @Transactional
    public TourDto createTour(TourCreateDto createDto) {
        Tour tour = Tour.builder()
                .title(createDto.getTitle())
                .description(createDto.getDescription())
                .longDescription(createDto.getLongDescription())
                .price(createDto.getPrice())
                .duration(createDto.getDuration())
                .section(createDto.getSection())
                .features(createDto.getFeatures())
                .itinerary(createDto.getItinerary())
                .included(createDto.getIncluded())
                .gallery(createDto.getGallery())
                .mainImage(createDto.getMainImage())
                .status(TourStatus.ACTIVE)
                .build();

        tour = tourRepository.save(tour);
        return mapToDto(tour);
    }

    @Transactional
    public TourDto updateTour(Long id, TourUpdateDto updateDto) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found"));

        tour.setTitle(updateDto.getTitle());
        tour.setDescription(updateDto.getDescription());
        tour.setLongDescription(updateDto.getLongDescription());
        tour.setPrice(updateDto.getPrice());
        tour.setDuration(updateDto.getDuration());
        tour.setStatus(updateDto.getStatus());
        tour.setSection(updateDto.getSection());
        tour.setFeatures(updateDto.getFeatures());
        tour.setItinerary(updateDto.getItinerary());
        tour.setIncluded(updateDto.getIncluded());
        tour.setGallery(updateDto.getGallery());
        tour.setMainImage(updateDto.getMainImage());

        tour = tourRepository.save(tour);
        return mapToDto(tour);
    }

    @Transactional
    public void deleteTour(Long id) {
        if (!tourRepository.existsById(id)) {
            throw new RuntimeException("Tour not found");
        }
        tourRepository.deleteById(id);
    }

    private TourDto mapToDto(Tour tour) {
        return TourDto.builder()
                .id(tour.getId())
                .title(tour.getTitle())
                .description(tour.getDescription())
                .longDescription(tour.getLongDescription())
                .price(tour.getPrice())
                .duration(tour.getDuration())
                .status(tour.getStatus())
                .section(tour.getSection())
                .features(tour.getFeatures())
                .itinerary(tour.getItinerary())
                .included(tour.getIncluded())
                .gallery(tour.getGallery())
                .mainImage(tour.getMainImage())
                .build();
    }
} 