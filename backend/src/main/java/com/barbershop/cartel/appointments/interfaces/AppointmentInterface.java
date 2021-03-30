package com.barbershop.cartel.appointments.interfaces;

import com.barbershop.cartel.appointments.models.AppointmentRequestModel;
import com.barbershop.cartel.appointments.models.AppointmentWeekModel;

public interface AppointmentInterface {

    AppointmentWeekModel getAppointmentsPreviousWeek(int numberOfWeeks, long barberId, long serviceId);

    AppointmentWeekModel getAppointmentsCurrentWeek(long barberId, long serviceId);

    AppointmentWeekModel getAppointmentsNextWeek(int numberOfWeeks, long barberId, long serviceId);

    void save(AppointmentRequestModel appointment);
}
