package com.barbershop.cartel.schedule.interfaces;

import com.barbershop.cartel.schedule.models.AppointmentRequestModel;
import com.barbershop.cartel.schedule.models.AppointmentWeekModel;

import java.time.LocalDate;

public interface ScheduleInterface {

    AppointmentWeekModel getAppointmentsPreviousWeek(int numberOfWeeks, long barberId, long serviceId);

    AppointmentWeekModel getAppointmentsCurrentWeek(long barberId, long serviceId);

    AppointmentWeekModel getAppointmentsNextWeek(int numberOfWeeks, long barberId, long serviceId);

    void save(AppointmentRequestModel appointment);

    AppointmentWeekModel getAppointmentsByBarberAndDates(long barberId, LocalDate from, LocalDate to);
}
