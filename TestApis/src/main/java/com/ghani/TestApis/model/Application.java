package com.ghani.TestApis.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "applied_at")
    private LocalDateTime appliedAt;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    @ManyToOne
    @JoinColumn(name = "job_id")
    // @JsonBackReference
    private Job job;

    // Many applications to one job seeker
    @ManyToOne
    @JoinColumn(name = "job_seeker_id")
    // @JsonBackReference(value = "user-applications")
    private User jobSeeker;

    // Getters, Setters, Constructors
}
