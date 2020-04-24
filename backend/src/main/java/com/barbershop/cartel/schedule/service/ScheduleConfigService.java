package com.barbershop.cartel.schedule.service;

import com.barbershop.cartel.schedule.entity.ScheduleConfigEntity;
import com.barbershop.cartel.schedule.interfaces.ScheduleConfigInterface;
import com.barbershop.cartel.schedule.models.ScheduleConfigModel;
import com.barbershop.cartel.schedule.repository.ScheduleConfigRepository;
import com.barbershop.cartel.users.entity.UserDetailsEntity;
import com.barbershop.cartel.users.interfaces.UserDetailsInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleConfigService implements ScheduleConfigInterface {

    @Autowired
    private UserDetailsInterface userDetailsInterface;

    @Autowired
    private ScheduleConfigRepository scheduleConfigRepository;

    private Optional<UserDetailsEntity> getBarberById(long barberId) {
        return userDetailsInterface.getBarberById(barberId);
    }

    private void saveConfiguration(ScheduleConfigModel configuration) {

        Optional<UserDetailsEntity> barber = getBarberById(configuration.getBarberId());

        if (barber.isPresent()) {

            ScheduleConfigEntity scheduleConfig = new ScheduleConfigEntity();

            scheduleConfig.setBarber(barber.get());
            scheduleConfig.setFirstAppointment(configuration.getFirstAppointment());
            scheduleConfig.setLastAppointment(configuration.getLastAppointment());
            scheduleConfig.setDate(configuration.getDate());
            scheduleConfig.setWorkingDay(configuration.isWorkingDay());

            scheduleConfigRepository.save(scheduleConfig);
        }
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

        Optional<UserDetailsEntity> barber = getBarberById(barberId);

        List<ScheduleConfigModel> configurations = new ArrayList<>();

        if (barber.isPresent()) {

            List<ScheduleConfigEntity> configsByBarber = scheduleConfigRepository.findAllByBarber(barber.get());

            for (ScheduleConfigEntity config : configsByBarber) {

                ScheduleConfigModel configuration = new ScheduleConfigModel();
                configuration.setBarberId(config.getId());
                configuration.setFirstAppointment(config.getFirstAppointment());
                configuration.setLastAppointment(config.getLastAppointment());
                configuration.setDate(config.getDate());
                configuration.setWorkingDay(config.isWorkingDay());

                configurations.add(configuration);
            }
        }

        return configurations;
    }

    @Override
    public ScheduleConfigModel getConfigurationByBarberIdAndDate(long barberId, LocalDate date) {

        Optional<UserDetailsEntity> barber = getBarberById(barberId);

        ScheduleConfigModel configuration = null;

        if (barber.isPresent()) {

            ScheduleConfigEntity config = scheduleConfigRepository.findByBarberAndDate(barber.get(), date);

            if (config != null) {

                configuration = new ScheduleConfigModel();

                configuration.setBarberId(config.getId());
                configuration.setFirstAppointment(config.getFirstAppointment());
                configuration.setLastAppointment(config.getLastAppointment());
                configuration.setDate(config.getDate());
                configuration.setWorkingDay(config.isWorkingDay());
            }
        }

        return configuration;
    }
}
