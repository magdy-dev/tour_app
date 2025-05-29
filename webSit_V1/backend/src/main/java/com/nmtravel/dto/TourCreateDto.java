package com.nmtravel.dto;

import com.nmtravel.entity.TourSection;
import lombok.Data;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class TourCreateDto {
    private String title;
    private String description;
    private String longDescription;
    private BigDecimal price;
    private String duration;
    private TourSection section;
    private List<String> features;
    private String itinerary;
    private List<String> included;
    private List<String> gallery;
    private String mainImage;
} 