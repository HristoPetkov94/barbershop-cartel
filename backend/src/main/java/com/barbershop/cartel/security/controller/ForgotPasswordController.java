package com.barbershop.cartel.security.controller;

import com.barbershop.cartel.security.service.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/forgot-password")
public class ForgotPasswordController {

    @Autowired
    private PasswordService passwordService;

    @PostMapping
    public void forgotPassword(@RequestParam String email) {
        passwordService.forgotPassword(email);
    }
}
