package com.barbershop.cartel.appointments.models;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AppointmentModel {

    public Long id;

    public LocalDateTime start;
    public LocalDateTime end;

    public String title;
}
