package com.barbershop.cartel.assignments.repository;

import com.barbershop.cartel.assignments.entity.AssignmentEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentRepository extends CrudRepository<AssignmentEntity, Long> {
}
