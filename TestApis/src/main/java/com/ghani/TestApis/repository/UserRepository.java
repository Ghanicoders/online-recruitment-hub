package com.ghani.TestApis.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ghani.TestApis.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
