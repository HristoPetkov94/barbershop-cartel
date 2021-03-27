package com.barbershop.cartel.assignments.repository;

import com.barbershop.cartel.assignments.entity.AssignmentEntity;
import com.barbershop.cartel.barbers.entity.BarberEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends CrudRepository<AssignmentEntity, Long> {

    List<AssignmentEntity> findAllByBarberId(Long barberId);
}
