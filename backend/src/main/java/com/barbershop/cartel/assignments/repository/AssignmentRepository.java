package com.barbershop.cartel.assignments.repository;

import com.barbershop.cartel.assignments.entity.AssignmentEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssignmentRepository extends CrudRepository<AssignmentEntity, Long> {

    List<AssignmentEntity> findAllByBarberId(long barberId);

    Optional<AssignmentEntity> findByBarberIdAndServiceId(long barberId, long serviceId);
}
