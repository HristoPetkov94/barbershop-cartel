package com.barbershop.cartel.work.day;

import com.barbershop.cartel.infrastructure.HasId;
import com.barbershop.cartel.barbers.entity.BarberEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = WorkDayEntity.TABLE_NAME)
public class WorkDayEntity implements HasId<Long> {

    public static final String TABLE_NAME = "work_day";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "day")
    private LocalDate day;

    @Column(name = "time_from")
    private LocalTime from;

    @Column(name = "time_to")
    private LocalTime to;

    @Column(name = "all_day")
    private boolean notWorking;

    @ManyToOne
    @JoinColumn(name = "barber_id")
    private BarberEntity barber;
}
