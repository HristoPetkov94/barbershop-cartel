package com.barbershop.cartel.clients.interfaces;

import com.barbershop.cartel.clients.entity.ClientEntity;
import com.barbershop.cartel.clients.models.ClientModel;

import java.util.List;
import java.util.Optional;

public interface ClientInterface {
    ClientEntity createClient(String email, String phoneNumber, String username);

    Optional<ClientEntity> findByPhone(String phone);

    List<ClientModel> all();

    void ban(long id, boolean banned);

    boolean isBanned(String phone);
}
