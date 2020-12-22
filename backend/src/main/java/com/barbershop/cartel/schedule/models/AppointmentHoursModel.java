package com.barbershop.cartel.schedule.models;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
public class AppointmentHoursModel {
    private LocalTime hour;
}
