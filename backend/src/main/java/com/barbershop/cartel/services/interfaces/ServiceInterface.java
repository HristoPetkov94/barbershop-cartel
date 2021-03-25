package com.barbershop.cartel.services.interfaces;

import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.services.models.ServiceModel;

import java.util.List;

public interface ServiceInterface {
    List<ServiceModel> getServices();

    ServiceEntity createService(ServiceModel serviceModel) throws Exception;

    void updateService(ServiceModel serviceModel) throws Exception;

    void deleteService(long serviceId);
}
