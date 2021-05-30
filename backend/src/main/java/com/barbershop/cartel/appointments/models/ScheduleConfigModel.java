package com.barbershop.cartel.appointments.models;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ScheduleConfigModel {
    private long barberId;
    private LocalDateTime firstAppointment;
    private LocalDateTime lastAppointment;
    private boolean isHoliday;
}
