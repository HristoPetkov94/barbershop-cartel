package com.barbershop.cartel.appointments.models;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
public class AppointmentHoursModel {
    private LocalTime time;
}
