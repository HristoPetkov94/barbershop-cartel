package com.barbershop.cartel.barbers.repository;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BarberRepository extends CrudRepository<BarberEntity, Long> {
    List<BarberEntity> findAllByOrderByIdDesc();
}
