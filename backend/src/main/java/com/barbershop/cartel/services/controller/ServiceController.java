package com.barbershop.cartel.services.controller;

import com.barbershop.cartel.services.entity.ServiceEntity;
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
    public List<ServiceModel> getAllServices() {
        return serviceInterface.getServices();
    }

    @PostMapping
    public ServiceModel createService(@RequestBody ServiceModel serviceModel) throws Exception {

        ServiceEntity service = serviceInterface.createService(serviceModel);
        serviceModel.setId(service.getId());

        return serviceModel;
    }

    @PutMapping
    public void updateService(@RequestBody ServiceModel serviceModel) throws Exception {
        serviceInterface.updateService(serviceModel);
    }

    @DeleteMapping
    public void deleteService(@RequestParam long serviceId) {
        serviceInterface.deleteService(serviceId);
    }
}
