package com.barbershop.cartel.appointments.models;

import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class AppointmentDayModel {
    private LocalDate date;
    private DayOfWeek dayOfWeek;
    private List<AppointmentHoursModel> hours;
    private boolean today;
}
