package com.barbershop.cartel.schedule.repository;

import com.barbershop.cartel.schedule.entity.ScheduleEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends CrudRepository<ScheduleEntity, Long> {
    List<ScheduleEntity> findByDateAndBarberId(LocalDate date, long barberId);
}
