package com.barbershop.cartel.services.service;

import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.services.interfaces.ServiceInterface;
import com.barbershop.cartel.services.models.ServiceModel;
import com.barbershop.cartel.services.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceService implements ServiceInterface {

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public List<ServiceModel> getServices() {

        List<ServiceModel> serviceModels = new ArrayList<>();
        Iterable<ServiceEntity> services = serviceRepository.findAll();

        for (ServiceEntity service : services) {

            ServiceModel serviceModel = new ServiceModel(service);
            serviceModels.add(serviceModel);
        }

        return serviceModels;
    }
}
