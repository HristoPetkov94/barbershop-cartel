package com.barbershop.cartel.clients.repository;

import com.barbershop.cartel.clients.entity.ClientEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends CrudRepository<ClientEntity, Long> {
    Optional<ClientEntity> findByPhone(String phone);
}
