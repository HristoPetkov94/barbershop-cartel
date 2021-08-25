package com.barbershop.cartel.appointments.repository;

import com.barbershop.cartel.appointments.entity.AppointmentEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends CrudRepository<AppointmentEntity, Long> {

    List<AppointmentEntity> findByBarberIdIn(long[] barberId);

    @Query("SELECT a FROM AppointmentEntity a WHERE a.barber.id = :barberId and NOT(:end < a.startTime or a.endTime < :start)")
    List<AppointmentEntity> findBetween(@Param("barberId") Long barberId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(a) > 0 FROM AppointmentEntity a WHERE a.barber.id = :barberId and NOT(:end < a.startTime or a.endTime < :start)")
    boolean existsBetween(@Param("barberId") Long barberId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
