package com.barbershop.cartel.services.service;

import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.services.interfaces.ServiceInterface;
import com.barbershop.cartel.services.models.ServiceModel;
import com.barbershop.cartel.services.repository.ServiceRepository;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceService implements ServiceInterface {

    @Autowired
    private ServiceRepository serviceRepository;

    private String image(byte[] image) {
        String picture = Base64.encodeBase64String(image);
        return "data:image/png;base64," + picture;
    }

    private void updateService(ServiceModel serviceModel) {

        Optional<ServiceEntity> optionalEntity = serviceRepository.findById(serviceModel.getId());

        ServiceEntity service = optionalEntity.orElse(new ServiceEntity());

        service.setServiceType(serviceModel.getServiceType());
        service.setPrice(serviceModel.getPrice());
        service.setDuration(serviceModel.getDuration());
        service.setDescription(serviceModel.getDescription());
        service.setPicture(serviceModel.getPicture());

        serviceRepository.save(service);
    }

    @Override
    public void save(ServiceModel service) {

        ServiceEntity newService = new ServiceEntity();

        newService.setServiceType(service.getServiceType());
        newService.setPrice(service.getPrice());
        newService.setDuration(service.getDuration());
        newService.setDescription(service.getDescription());

        if (service.getPicture() != null)
            newService.setPicture(service.getPicture());

        serviceRepository.save(newService);
    }

    @Override
    public Optional<ServiceEntity> getServiceById(long serviceId) {
        return serviceRepository.findById(serviceId);
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
    public void updateAll(ServiceModel service) {
        updateService(service);
    }

    @Override
    public void updateAll(List<ServiceModel> services) {

        for (ServiceModel service : services) {

            if (service.isDeleted()) {
                serviceRepository.deleteById(service.getId());
                continue;
            }

            updateService(service);
        }
    }

    @Override
    public void delete(long serviceId) {
        serviceRepository.deleteById(serviceId);
    }
}
