package com.barbershop.cartel.work.weekday;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkWeekDayRepository extends CrudRepository<WorkWeekDayEntity, Long> {

    List<WorkWeekDayEntity> findByBarberIdIn(long[] barberId);

    void deleteAllByBarberId(long barberId);
}
