package com.barbershop.cartel.services.repository;

import com.barbershop.cartel.services.entity.ServiceEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ServiceRepository extends CrudRepository<ServiceEntity, Long> {
}
