package com.barbershop.cartel.appointments.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AppointmentDayModel {
    private LocalDate date;
    private DayOfWeek dayOfWeek;
    private List<LocalTime> hours;
    private boolean today;
}
