package com.barbershop.cartel.appointments.repository;

import com.barbershop.cartel.appointments.entity.AppointmentEntity;
import com.barbershop.cartel.appointments.models.AppointmentModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends CrudRepository<AppointmentEntity, Long> {
    List<AppointmentEntity> findAllByStartTimeGreaterThanEqualAndEndTimeLessThanEqualAndBarberId(LocalDateTime startOfDay, LocalDateTime endOfDay, long barberId);

    List<AppointmentEntity> findByBarberIdIn(long[] barberId);

}
