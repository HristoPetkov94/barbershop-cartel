package com.barbershop.cartel.barbers.controller;

import com.barbershop.cartel.barbers.interfaces.BarberInterface;
import com.barbershop.cartel.barbers.models.BarberModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/barbers")
public class BarberController {

    @Autowired
    private BarberInterface barberInterface;

    @GetMapping
    public List<BarberModel> getAllUsers() {
        return barberInterface.getAllBarbers();
    }

    @PostMapping
    public void updateBarber(@RequestBody BarberModel barber) {
        barberInterface.updateBarber(barber);
    }

    @PostMapping("{barberId}/picture")
    public void uploadPicture(@PathVariable long barberId, @RequestBody byte[] image) {
        barberInterface.uploadPicture(barberId, image);
    }

//    @GetMapping("/barber-by-email")
//    public BarberModel getBarberByEmail(@RequestParam String email) {
//        return barberInterface.getBarberByEmail(email);
//    }
}
