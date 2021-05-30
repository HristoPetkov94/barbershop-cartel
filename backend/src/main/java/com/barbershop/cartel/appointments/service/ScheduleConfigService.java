package com.barbershop.cartel.appointments.service;

import com.barbershop.cartel.appointments.entity.ScheduleConfigEntity;
import com.barbershop.cartel.appointments.interfaces.ScheduleConfigInterface;
import com.barbershop.cartel.appointments.models.ScheduleConfigModel;
import com.barbershop.cartel.appointments.repository.ScheduleConfigRepository;
import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.interfaces.BarberInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ScheduleConfigService implements ScheduleConfigInterface {

    @Autowired
    private BarberInterface barberInterface;

    @Autowired
    private ScheduleConfigRepository scheduleConfigRepository;

    private void saveConfiguration(ScheduleConfigModel configuration) {

        BarberEntity barber = barberInterface.getBarberById(configuration.getBarberId());


        ScheduleConfigEntity scheduleConfig = new ScheduleConfigEntity();

        scheduleConfig.setBarber(barber);
//        scheduleConfig.setFirstAppointment(configuration.getFirstAppointment());
//        scheduleConfig.setLastAppointment(configuration.getLastAppointment());
//        scheduleConfig.setDate(configuration.getDate());
        scheduleConfig.setWorkingDay(configuration.isHoliday());

        scheduleConfigRepository.save(scheduleConfig);
    }

    @Override
    public void save(ScheduleConfigModel configuration) {
        saveConfiguration(configuration);
    }

    @Override
    public void save(List<ScheduleConfigModel> configurations) {

        for (ScheduleConfigModel configuration : configurations) {

            saveConfiguration(configuration);
        }
    }

    @Override
    public List<ScheduleConfigModel> getConfigurationsByBarberId(long barberId) {

        BarberEntity barber = barberInterface.getBarberById(barberId);

        List<ScheduleConfigModel> configurations = new ArrayList<>();


        List<ScheduleConfigEntity> configsByBarber = scheduleConfigRepository.findAllByBarber(barber);

        for (ScheduleConfigEntity config : configsByBarber) {

            ScheduleConfigModel configuration = new ScheduleConfigModel();
            configuration.setBarberId(config.getId());
            //configuration.setFirstAppointment(config.getFirstAppointment());
           // configuration.setLastAppointment(config.getLastAppointment());
            //configuration.setDate(config.getDate());
            configuration.setHoliday(config.isWorkingDay());

            configurations.add(configuration);
        }

        return configurations;
    }

    @Override
    public ScheduleConfigModel getConfigurationByBarberIdAndDate(long barberId, LocalDate date) {

        BarberEntity barber = barberInterface.getBarberById(barberId);

        ScheduleConfigModel configuration = new ScheduleConfigModel();


        ScheduleConfigEntity config = scheduleConfigRepository.findByBarberAndDate(barber, date);

        if (config != null) {

            configuration = new ScheduleConfigModel();

            configuration.setBarberId(config.getId());
            //configuration.setFirstAppointment(config.getFirstAppointment());
           // configuration.setLastAppointment(config.getLastAppointment());
           // configuration.setDate(config.getDate());
            configuration.setHoliday(config.isWorkingDay());
        }

        return configuration;
    }
}
