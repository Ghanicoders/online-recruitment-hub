package com.ghani.TestApis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ghani.TestApis.model.User;
import com.ghani.TestApis.service.AuthenticationService;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class Authentication {

    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        System.out.println(user.getRole());
        return authenticationService.registerUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return authenticationService.authenticate(user.getEmail(), user.getPassword());
    }

    @PostMapping("/api/auth/logout/{userId}")
    public String logout(@PathVariable Long userId) {
        return "User logged out successfully!";
    }

}
