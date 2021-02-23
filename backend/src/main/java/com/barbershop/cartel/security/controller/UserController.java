package com.barbershop.cartel.security.controller;

import com.barbershop.cartel.security.models.PasswordChangeRequest;
import com.barbershop.cartel.security.models.UserModel;
import com.barbershop.cartel.security.service.PasswordService;
import com.barbershop.cartel.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordService passwordService;

    @GetMapping
    public List<UserModel> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/change-password")
    public void changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest, @Autowired Authentication authentication) throws Exception {
        String name = authentication.getName();

        String oldPassword = passwordChangeRequest.getOldPassword();
        String newPassword = passwordChangeRequest.getNewPassword();

        passwordService.changePassword(name, oldPassword, newPassword);
    }

    @PostMapping("/forgot-password")
    public void forgotPassword(@RequestParam String email) throws Exception {
        passwordService.forgotPassword(email);
    }
}
