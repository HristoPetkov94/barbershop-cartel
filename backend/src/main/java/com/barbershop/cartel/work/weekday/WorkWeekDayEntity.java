package com.barbershop.cartel.work.weekday;

import com.barbershop.cartel.infrastructure.HasId;
import com.barbershop.cartel.barbers.entity.BarberEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = WorkWeekDayEntity.TABLE_NAME)
public class WorkWeekDayEntity implements HasId<Long> {

    public static final String TABLE_NAME = "work_week_days";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "day_of_week")
    private DayOfWeek dayOfWeek;

    @Column(name = "time_from")
    private LocalTime from;

    @Column(name = "time_to")
    private LocalTime to;

    @Column(name = "not_working")
    private boolean notWorking;

    @ManyToOne
    @JoinColumn(name = "barber_id")
    private BarberEntity barber;
}
