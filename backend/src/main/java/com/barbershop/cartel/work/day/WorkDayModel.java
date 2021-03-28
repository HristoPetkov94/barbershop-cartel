package com.barbershop.cartel.work.day;

import com.barbershop.cartel.infrastructure.HasId;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Getter
@Setter
public class WorkDayModel implements HasId<Long> {

    private Long id;

    private LocalDate day;

    private LocalTime from;

    private LocalTime to;

    private boolean notWorking;

    private Long barberId;
}
