package com.barbershop.cartel.appointments.interfaces;

import com.barbershop.cartel.appointments.models.AppointmentRequestModel;
import com.barbershop.cartel.appointments.models.AppointmentWeekModel;
import com.barbershop.cartel.general.config.info.enums.LanguageEnum;

public interface AppointmentInterface {

    AppointmentWeekModel getAppointmentsPreviousWeek(int numberOfWeeks, long assignmentId);

    AppointmentWeekModel getAppointmentsCurrentWeek(long assignmentId);

    AppointmentWeekModel getAppointmentsNextWeek(int numberOfWeeks, long assignmentId);

    void save(AppointmentRequestModel appointmentModel, LanguageEnum language);
}
