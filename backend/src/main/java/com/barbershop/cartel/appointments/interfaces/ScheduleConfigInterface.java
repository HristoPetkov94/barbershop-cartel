package com.barbershop.cartel.appointments.interfaces;

import com.barbershop.cartel.appointments.models.AppointmentModel;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleConfigInterface {

    List<AppointmentModel> getAppointments(long[] barberIds, LocalDateTime from, LocalDateTime to);
}
