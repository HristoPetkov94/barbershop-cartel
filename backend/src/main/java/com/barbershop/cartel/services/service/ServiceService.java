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

    private ServiceEntity createService(long barberId, ServiceModel serviceModel) {

        ServiceEntity service = new ServiceEntity();

        service.setServiceType(serviceModel.getServiceType());
        service.setPrice(serviceModel.getPrice());
        service.setDuration(serviceModel.getDuration());
        service.setDescription(serviceModel.getDescription());
        service.setPicture(serviceModel.getPicture());
        service.setBarberId(barberId);

        return serviceRepository.save(service);
    }

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

    @Override
    public void createServices(long barberId, List<ServiceModel> services) {

        serviceRepository.deleteAllByBarberId(barberId);

        for (ServiceModel service : services) {
            createService(barberId, service);
        }
    }
}
