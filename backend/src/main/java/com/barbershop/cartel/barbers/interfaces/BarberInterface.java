package com.barbershop.cartel.barbers.interfaces;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.models.BarberModel;
import com.barbershop.cartel.services.models.ServiceModel;

import java.util.List;
import java.util.Optional;

public interface BarberInterface {
    List<BarberModel> getBarbers();

    Optional<BarberEntity> getBarberById(long barberId);

    long createBarber(BarberModel barbers);

    void updateBarber(BarberModel barberModel) throws Exception;

    void createService(long barberId, ServiceModel serviceModel) throws Exception;

    void updateService(long barberId, ServiceModel serviceModel) throws Exception;

    void deleteBarber(long barberId);

    void deleteService(long barberId, long serviceId) throws Exception;
}
