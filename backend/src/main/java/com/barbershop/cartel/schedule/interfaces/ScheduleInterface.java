package com.barbershop.cartel.schedule.interfaces;

import com.barbershop.cartel.schedule.models.AppointmentRequestModel;
import com.barbershop.cartel.schedule.models.AppointmentWeekModel;

import java.time.LocalDate;

public interface ScheduleInterface {

    AppointmentWeekModel getAppointmentsPreviousWeek(int numberOfWeeks, long barberId);

    AppointmentWeekModel getAppointmentsCurrentWeek(long barberId);

    AppointmentWeekModel getAppointmentsNextWeek(int numberOfWeeks, long barberId);

    void save(AppointmentRequestModel appointment);

    AppointmentWeekModel getAppointmentsByBarberAndDates(long barberId, LocalDate from, LocalDate to);
}
