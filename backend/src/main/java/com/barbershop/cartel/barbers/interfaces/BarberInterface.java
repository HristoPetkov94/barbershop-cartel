package com.barbershop.cartel.barbers.interfaces;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.models.BarberModel;
import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.services.models.ServiceModel;

import java.util.List;
import java.util.Optional;

public interface BarberInterface {
    List<BarberModel> getBarbers();

    Optional<BarberEntity> getBarberById(long barberId);

    BarberEntity createBarber(BarberModel barberModel);

    void updateBarber(BarberModel barberModel) throws Exception;

    void deleteBarber(long barberId);
}
