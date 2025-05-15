package com.ghani.TestApis.model;

import java.time.LocalDateTime;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String location;

    @Column(name = "posted_at")
    private LocalDateTime postedAt;

    // Many jobs to one employer
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private User employer;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    private List<Application> applications;

    // Getters, Setters, Constructors
}
