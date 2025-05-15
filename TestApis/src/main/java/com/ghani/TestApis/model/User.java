package com.ghani.TestApis.model;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    // EMPLOYER: One-to-many jobs
    @OneToMany(mappedBy = "employer", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Job> postedJobs;

    // JOB_SEEKER: One-to-many applications
    @OneToMany(mappedBy = "jobSeeker", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-applications")
    @JsonIgnore
    private List<Application> applications;

    // Getters, Setters, Constructors
}
