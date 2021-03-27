package com.barbershop.cartel.barbers.interfaces;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.models.BarberModel;

import java.util.List;

public interface BarberInterface {
    List<BarberModel> getBarbers();

    BarberEntity getBarberById(long barberId);

    BarberEntity createBarber(BarberModel barberModel);

    void updateBarber(BarberModel barberModel) throws Exception;

    void deleteBarber(long barberId);
}
