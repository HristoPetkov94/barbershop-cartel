package com.barbershop.cartel.work.weekday;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkWeekDayRepository extends CrudRepository<WorkWeekDayEntity, Long> {

    List<WorkWeekDayEntity> findAllByBarberId(long barberId);
}
