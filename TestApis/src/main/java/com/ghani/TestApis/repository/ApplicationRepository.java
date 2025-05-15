package com.ghani.TestApis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ghani.TestApis.model.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByJobSeekerId(Long jobSeekerId);

    List<Application> findByJobId(Long jobId);
}
