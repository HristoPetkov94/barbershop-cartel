package com.barbershop.cartel.services.controller;

import com.barbershop.cartel.services.interfaces.ServiceInterface;
import com.barbershop.cartel.services.models.ServiceModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
public class ServiceController {

    @Autowired
    private ServiceInterface serviceInterface;

    @GetMapping
    public List<ServiceModel> getAll() {
        return serviceInterface.getServices();
    }
}
