package com.barbershop.cartel.clients.service;

import com.barbershop.cartel.clients.entity.ClientEntity;
import com.barbershop.cartel.clients.interfaces.ClientInterface;
import com.barbershop.cartel.clients.models.ClientModel;
import com.barbershop.cartel.clients.repository.ClientRepository;
import lombok.val;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ClientService implements ClientInterface {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ModelMapper modelMapper;

    public ClientEntity createClient(String email, String phoneNumber, String username) {

        ClientEntity client = new ClientEntity();

        client.setEmail(email);
        client.setName(username);
        client.setPhone(phoneNumber);

        return clientRepository.save(client);
    }

    public Optional<ClientEntity> findByPhone(String phone) {
        return clientRepository.findByPhone(phone);
    }

    @Override
    public List<ClientModel> all() {

        val collect = StreamSupport.stream(clientRepository.findAll().spliterator(), false)
                .map(x -> modelMapper.map(x, ClientModel.class))
                .collect(Collectors.toList());

        return collect;
    }
}
