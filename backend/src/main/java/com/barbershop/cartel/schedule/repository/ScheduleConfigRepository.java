package com.barbershop.cartel.schedule.repository;

import com.barbershop.cartel.schedule.entity.ScheduleConfigEntity;
import com.barbershop.cartel.barbers.entity.BarberEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleConfigRepository extends CrudRepository<ScheduleConfigEntity, Long> {

    List<ScheduleConfigEntity> findAllByBarber(BarberEntity barber);

    ScheduleConfigEntity findByBarberAndDate(BarberEntity barber, LocalDate date);
}
