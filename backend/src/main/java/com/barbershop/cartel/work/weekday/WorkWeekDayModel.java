package com.barbershop.cartel.work.weekday;

import com.barbershop.cartel.infrastructure.HasId;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Getter
@Setter
public class WorkWeekDayModel implements HasId<Long> {

    private Long id;

    private DayOfWeek dayOfWeek;

    private LocalTime from;

    private LocalTime to;

    private boolean notWorking;

    private Long barberId;
}
