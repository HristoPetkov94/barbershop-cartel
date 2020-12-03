package com.barbershop.cartel.barbers.repository;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarberRepository extends CrudRepository<BarberEntity, Long> {
}
