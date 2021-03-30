package com.barbershop.cartel.appointments.repository;

import com.barbershop.cartel.appointments.entity.AppointmentEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends CrudRepository<AppointmentEntity, Long> {
    List<AppointmentEntity> findByDateAndBarberId(LocalDate date, long barberId);
}
