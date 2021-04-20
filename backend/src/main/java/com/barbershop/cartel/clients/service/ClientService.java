package com.barbershop.cartel.clients.service;

import com.barbershop.cartel.clients.entity.ClientEntity;
import com.barbershop.cartel.clients.interfaces.ClientInterface;
import com.barbershop.cartel.clients.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientService implements ClientInterface {

    @Autowired
    private ClientRepository clientRepository;

    public ClientEntity createClient(String email, String username) {

        ClientEntity client = new ClientEntity();

        client.setEmail(email);
        client.setUsername(username);

        return clientRepository.save(client);
    }

    public Optional<ClientEntity> findByEmail(String email) {
        return clientRepository.findByEmail(email);
    }
}
