package com.barbershop.cartel.barbers.controller;

import com.barbershop.cartel.barbers.interfaces.BarberInterface;
import com.barbershop.cartel.barbers.models.BarberModel;
import com.barbershop.cartel.services.models.ServiceModel;
import com.barbershop.cartel.utils.PictureUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
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
    public void createBarber(@RequestBody BarberModel barber) {
        barberInterface.createBarber(barber);
    }

    @PutMapping
    public void updateBarber(@RequestBody BarberModel barber) throws Exception {
        barberInterface.updateBarber(barber);
    }

    @DeleteMapping
    public void deleteBarber(@RequestParam long barberId) {
        barberInterface.deleteBarber(barberId);
    }

    @PostMapping("/create-service")
    public void createService(@RequestParam long barberId, @RequestBody ServiceModel serviceModel) throws Exception {
        barberInterface.createService(barberId, serviceModel);
    }

    @PutMapping("/update-service")
    public void updateService(@RequestParam long barberId, @RequestBody ServiceModel serviceModel) throws Exception {
        barberInterface.updateService(barberId, serviceModel);
    }

    @DeleteMapping("/delete-service")
    public void deleteService(@RequestParam long barberId, @RequestParam long serviceId) throws Exception {
        barberInterface.deleteService(barberId, serviceId);
    }
}
