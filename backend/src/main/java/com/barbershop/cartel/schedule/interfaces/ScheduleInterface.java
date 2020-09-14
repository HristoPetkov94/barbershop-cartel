package com.barbershop.cartel.schedule.interfaces;

import com.barbershop.cartel.schedule.models.AppointmentRequestModel;
import com.barbershop.cartel.schedule.models.AppointmentWeekModel;

import java.time.LocalDate;

public interface ScheduleInterface {
    AppointmentWeekModel getAppointmentCurrentWeek(long barberId);

    AppointmentWeekModel getAppointmentNextWeek(AppointmentWeekModel currentWeek, long barberId);

    AppointmentWeekModel getAppointmentPreviousWeek(AppointmentWeekModel currentWeek, long barberId);

    void save(AppointmentRequestModel appointment);

    AppointmentWeekModel getAppointmentsByBarberAndDates(long barberId, LocalDate from, LocalDate to);
}
