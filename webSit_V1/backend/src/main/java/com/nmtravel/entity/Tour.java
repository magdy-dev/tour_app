package com.nmtravel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tours")
@Getter
@Setter
@SuperBuilder
public class Tour extends BaseEntity {
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    @Column(length = 2000)
    private String longDescription;
    
    @Column(nullable = false)
    private BigDecimal price;
    
    @Column(nullable = false)
    private String duration;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TourStatus status;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TourSection section;
    
    @ElementCollection
    @CollectionTable(name = "tour_features", joinColumns = @JoinColumn(name = "tour_id"))
    @Column(name = "feature")
    private List<String> features = new ArrayList<>();
    
    @Column(length = 2000)
    private String itinerary;
    
    @ElementCollection
    @CollectionTable(name = "tour_included", joinColumns = @JoinColumn(name = "tour_id"))
    @Column(name = "included_item")
    private List<String> included = new ArrayList<>();
    
    @ElementCollection
    @CollectionTable(name = "tour_gallery", joinColumns = @JoinColumn(name = "tour_id"))
    @Column(name = "image_url")
    private List<String> gallery = new ArrayList<>();
    
    private String mainImage;
    
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();
    
    public Tour() {
        this.status = TourStatus.ACTIVE;
    }
} 