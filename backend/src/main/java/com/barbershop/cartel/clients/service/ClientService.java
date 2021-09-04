package com.barbershop.cartel.clients.service;

import com.barbershop.cartel.clients.entity.ClientEntity;
import com.barbershop.cartel.clients.interfaces.ClientInterface;
import com.barbershop.cartel.clients.models.ClientModel;
import com.barbershop.cartel.clients.models.ClientStatisticsModel;
import com.barbershop.cartel.clients.repository.ClientRepository;
import lombok.val;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientService implements ClientInterface {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private EntityManager em;

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

        Query query = em.createNativeQuery("select c.id, " +
                "c.phone, " +
                "c.email, " +
                "c.name," +
                "c.banned, " +
                "sum(case when a.no_show = true then 1 else 0 end) as missed_appointments_count, " +
                "count(*) as all_appointments_count " +
                "from clients c join appointments a on c.phone = a.phone " +
                "group by " + "c.id, c.phone, c.email, c.name, c.banned", ClientStatisticsModel.class);

        List<ClientStatisticsModel> users = query.getResultList();

        val models = users.stream().map(x -> modelMapper.map(x, ClientModel.class))
                .collect(Collectors.toList());

        return models;
    }

    @Override
    public void ban(long id, boolean banned) {

        val byId = clientRepository.findById(id);

        byId.get().setBanned(banned);

        clientRepository.save(byId.get());
    }
}
