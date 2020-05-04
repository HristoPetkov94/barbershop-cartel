package com.barbershop.cartel.users.controller;

import com.barbershop.cartel.users.interfaces.UserDetailsInterface;
import com.barbershop.cartel.users.models.UserDetailsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/barbers")
public class UserController {

    @Autowired
    private UserDetailsInterface userDetailsInterface;

    @GetMapping
    public List<UserDetailsModel> getAllUsers() {
        return userDetailsInterface.getAllUsers();
    }

    @PostMapping
    public void updateBarber(@RequestBody UserDetailsModel barber) {
        userDetailsInterface.updateBarber(barber);
    }

    @PostMapping("{barberId}/picture")
    public void uploadPicture(@PathVariable long barberId, @RequestBody byte[] image) {
        userDetailsInterface.uploadPicture(barberId, image);
    }

    @GetMapping("/barber-by-email")
    public UserDetailsModel getBarberByEmail(@RequestParam String email) {
        return userDetailsInterface.getBarberByEmail(email);
    }
}
