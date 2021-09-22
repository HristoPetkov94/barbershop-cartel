package com.barbershop.cartel.barbers.controller;

import com.barbershop.cartel.barbers.entity.BarberEntity;
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
    public List<BarberModel> getBarbers() {
        return barberInterface.getBarbers();
    }

    @PostMapping
    public BarberModel createBarber(@RequestBody BarberModel barberModel) {

        BarberEntity barber = barberInterface.createBarber(barberModel);
        barberModel.setId(barber.getId());

        return barberModel;
    }

    @PutMapping
    public void updateBarber(@RequestBody BarberModel barber) throws Exception {
        barberInterface.updateBarber(barber);
    }

    @DeleteMapping
    public void deleteBarber(@RequestParam long barberId) {
        barberInterface.deleteBarber(barberId);
    }
}