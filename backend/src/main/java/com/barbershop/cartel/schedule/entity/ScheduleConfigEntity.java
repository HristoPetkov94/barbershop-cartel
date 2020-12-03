package com.barbershop.cartel.schedule.entity;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = ScheduleConfigEntity.TABLE_NAME)
public class ScheduleConfigEntity {

    public static final String TABLE_NAME = "schedule_config";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private BarberEntity barber;

    @Column(name = "first_appointment")
    private LocalTime firstAppointment;

    @Column(name = "last_appointment")
    private LocalTime lastAppointment;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "working_day")
    private boolean workingDay;
}
