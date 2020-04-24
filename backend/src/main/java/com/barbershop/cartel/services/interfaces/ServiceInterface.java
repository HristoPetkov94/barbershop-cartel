package com.barbershop.cartel.services.interfaces;

import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.services.models.ServiceModel;

import java.util.List;
import java.util.Optional;

public interface ServiceInterface {
    void save(ServiceModel service);

    Optional<ServiceEntity> getServiceById(long serviceId);

    List<ServiceModel> getServices();

    void update(ServiceModel service);

    void update(List<ServiceModel> services);

    void delete(long serviceId);
}
