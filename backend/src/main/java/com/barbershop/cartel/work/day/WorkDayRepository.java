package com.barbershop.cartel.work.day;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WorkDayRepository extends CrudRepository<WorkDayEntity, Long> {
    List<WorkDayEntity> findAllByBarberId(long barberId);

    List<WorkDayEntity> findAllByBarberIdInAndDayAfterAndDayBefore(List<Long> barberIds, LocalDate from, LocalDate to);
}
