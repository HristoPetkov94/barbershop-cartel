package com.barbershop.cartel.appointments.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AppointmentWeekModel {
    private List<AppointmentDayModel> days;
}
