package com.barbershop.cartel.schedule.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AppointmentWeekModel {
    private List<AppointmentDayModel> days;
}
