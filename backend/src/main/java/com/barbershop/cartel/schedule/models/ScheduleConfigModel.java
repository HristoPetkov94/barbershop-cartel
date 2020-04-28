package com.barbershop.cartel.schedule.models;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class ScheduleConfigModel {
    private long barberId;
    private LocalTime firstAppointment;
    private LocalTime lastAppointment;
    private LocalDate date;
    private boolean workingDay;

    public ScheduleConfigModel() {
        // these are defaults
        workingDay = true;

        firstAppointment = LocalTime.of(10, 0);
        lastAppointment = LocalTime.of(19, 0);
    }
}
