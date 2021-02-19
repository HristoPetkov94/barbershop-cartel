package com.barbershop.cartel.security.controller;

import com.barbershop.cartel.security.models.UserModel;
import com.barbershop.cartel.security.models.PasswordValidationModel;
import com.barbershop.cartel.security.service.PasswordService;
import com.barbershop.cartel.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/validate-password")
    public void validatePassword(@RequestBody PasswordValidationModel validate) throws Exception {
        passwordService.validatePassword(validate);
    }

    @PostMapping("/change-password")
    public void changePassword(@RequestBody UserModel userModel) {
        passwordService.changePassword(userModel);
    }

    @PostMapping("/forgot-password")
    public void forgotPassword(@RequestParam String email) {
        passwordService.forgotPassword(email);
    }
}
