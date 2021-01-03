package com.barbershop.cartel.barbers.interfaces;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.models.BarberModel;

import java.util.List;
import java.util.Optional;

public interface BarberInterface {
    List<BarberModel> getAllBarbers();

    Optional<BarberEntity> getBarberById(long barberId);

    //UserDetailsModel getBarberByEmail(String email);

//    String uploadPicture(long barberId, byte[] image);

    void update(BarberModel barber);

    void updateAll(List<BarberModel> barbers);
}
