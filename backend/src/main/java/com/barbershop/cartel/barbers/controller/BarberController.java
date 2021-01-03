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
    public List<BarberModel> getAll() {
        return barberInterface.getAllBarbers();
    }

    @PostMapping
    public void update(@RequestBody BarberModel barber) {
        barberInterface.update(barber);
    }

    @PatchMapping
    public void updateAll(@RequestBody List<BarberModel> barbers) {
        barberInterface.updateAll(barbers);
    }

}
