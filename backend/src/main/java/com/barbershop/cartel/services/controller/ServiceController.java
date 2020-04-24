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

    @PostMapping
    public void saveService(@RequestBody ServiceModel service) {
        serviceInterface.save(service);
    }

    @GetMapping
    public List<ServiceModel> getServices() {
        return serviceInterface.getServices();
    }

    @PutMapping
    public void update(@RequestBody ServiceModel service) {
        serviceInterface.update(service);
    }

    @PatchMapping
    public void update(@RequestBody List<ServiceModel> services) {
        serviceInterface.update(services);
    }

    @DeleteMapping("/{serviceId}")
    public void delete(@PathVariable long serviceId) {
        serviceInterface.delete(serviceId);
    }
}
