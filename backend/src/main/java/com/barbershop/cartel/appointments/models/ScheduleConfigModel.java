package com.barbershop.cartel.appointments.models;

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
    private boolean isHoliday;
}
