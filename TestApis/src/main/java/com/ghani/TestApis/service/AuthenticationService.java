package com.ghani.TestApis.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ghani.TestApis.model.User;
import com.ghani.TestApis.repository.UserRepository;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    public User authenticate(String email, String password) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User registerUser(User user) {
        if (user == null) {
            return null;
        }

        return userRepository.save(user);
    }
}
