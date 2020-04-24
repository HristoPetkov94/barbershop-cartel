package com.barbershop.cartel.users.interfaces;

import com.barbershop.cartel.users.entity.UserDetailsEntity;
import com.barbershop.cartel.users.models.UserDetailsModel;

import java.util.List;
import java.util.Optional;

public interface UserDetailsInterface {
    List<UserDetailsModel> getAllUsers();

    Optional<UserDetailsEntity> getBarberById(long barberId);

    UserDetailsModel getBarberByEmail(String email);

    void uploadPicture(long barberId, byte[] image);

    void updateBarber(UserDetailsModel barber);
}
