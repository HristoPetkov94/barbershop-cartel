package com.barbershop.cartel.clients.interfaces;

import com.barbershop.cartel.clients.entity.ClientEntity;

import java.util.Optional;

public interface ClientInterface {
    ClientEntity createClient(String email, String phoneNumber, String username);

    Optional<ClientEntity> findByPhone(String phone);
}
