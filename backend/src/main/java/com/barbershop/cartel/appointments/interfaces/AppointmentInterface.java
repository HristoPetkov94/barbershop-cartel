package com.barbershop.cartel.appointments.interfaces;

import com.barbershop.cartel.appointments.models.AppointmentDayModel;
import com.barbershop.cartel.appointments.models.AppointmentModel;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentInterface {

    List<AppointmentModel> getAppointments(long[] barberId, LocalDateTime from, LocalDateTime to);

    void create(AppointmentModel appointmentModel, boolean allowOverlap);

    void update(AppointmentModel appointmentModel);

    void delete(long id);

    List<AppointmentDayModel> getAppointmentsNextWeek(long assignmentId, int numberOfWeeks);

}
