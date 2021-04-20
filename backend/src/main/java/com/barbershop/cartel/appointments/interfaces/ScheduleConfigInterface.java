package com.barbershop.cartel.appointments.interfaces;

import com.barbershop.cartel.appointments.models.ScheduleConfigModel;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleConfigInterface {
    void save(ScheduleConfigModel configuration);

    void save(List<ScheduleConfigModel> configurations);

    List<ScheduleConfigModel> getConfigurationsByBarberId(long barberId);

    ScheduleConfigModel getConfigurationByBarberIdAndDate(long barberId, LocalDate date);
}
