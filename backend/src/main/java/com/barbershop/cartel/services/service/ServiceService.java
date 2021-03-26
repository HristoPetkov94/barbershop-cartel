package com.barbershop.cartel.services.service;

import com.barbershop.cartel.errors.CartelCustomException;
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

    @Override
    public ServiceEntity getServiceById(long serviceId) {
        return serviceRepository.findById(serviceId)
                .orElseThrow(() -> new CartelCustomException("Service with id:" + serviceId + " is not existing"));
    }

    @Override
    public ServiceEntity createService(ServiceModel serviceModel) {

        ServiceEntity service = new ServiceEntity();

        service.setServiceTitle(serviceModel.getServiceTitle());
        service.setDescription(serviceModel.getDescription());
        service.setPicture(serviceModel.getPicture());

        return serviceRepository.save(service);
    }

    @Override
    public void updateService(ServiceModel serviceModel) {

        Long serviceId = serviceModel.getId();

        ServiceEntity service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new CartelCustomException("Service with id:" + serviceId + " is not existing"));

        service.setServiceTitle(serviceModel.getServiceTitle());
        service.setDescription(serviceModel.getDescription());
        service.setPicture(serviceModel.getPicture());

        serviceRepository.save(service);
    }

    @Override
    public void deleteService(long serviceId) {

        ServiceEntity service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new CartelCustomException("Service with id:" + serviceId + " is not existing"));

        serviceRepository.delete(service);
    }
}
