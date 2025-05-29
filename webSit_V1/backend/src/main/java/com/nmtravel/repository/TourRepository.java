package com.nmtravel.repository;

import com.nmtravel.entity.Tour;
import com.nmtravel.entity.TourSection;
import com.nmtravel.entity.TourStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {
    List<Tour> findByStatus(TourStatus status);
    List<Tour> findBySection(TourSection section);
    List<Tour> findByStatusAndSection(TourStatus status, TourSection section);
    List<Tour> findByTitleContainingIgnoreCase(String title);
} 