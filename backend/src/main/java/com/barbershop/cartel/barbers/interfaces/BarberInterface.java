package com.barbershop.cartel.barbers.interfaces;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.models.BarberModel;

import java.util.List;
import java.util.Optional;

public interface BarberInterface {
    List<BarberModel> getBarbers();

    Optional<BarberEntity> getBarberById(long barberId);

    void createBarbers(List<BarberModel> barbers);
}
