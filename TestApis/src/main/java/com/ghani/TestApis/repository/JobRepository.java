package com.ghani.TestApis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ghani.TestApis.model.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByLocationContainingIgnoreCase(String location);

    List<Job> findByTitleContainingIgnoreCase(String title);
}
