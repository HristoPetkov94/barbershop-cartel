package com.barbershop.cartel.schedule.repository;

import com.barbershop.cartel.schedule.entity.ScheduleConfigEntity;
import com.barbershop.cartel.users.entity.UserDetailsEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleConfigRepository extends CrudRepository<ScheduleConfigEntity, Long> {

    List<ScheduleConfigEntity> findAllByBarber(UserDetailsEntity barber);

    ScheduleConfigEntity findByBarberAndDate(UserDetailsEntity barber, LocalDate date);
}
