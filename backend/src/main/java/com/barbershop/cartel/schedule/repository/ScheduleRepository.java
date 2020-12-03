package com.barbershop.cartel.schedule.repository;

import com.barbershop.cartel.schedule.entity.ScheduleEntity;
import com.barbershop.cartel.barbers.entity.BarberEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends CrudRepository<ScheduleEntity, Long> {
    List<ScheduleEntity> findByDateAndBarber(LocalDate date, BarberEntity barber);

    Optional<ScheduleEntity> findByHourAndDateAndBarber(LocalTime hour, LocalDate date, BarberEntity barber);
}
