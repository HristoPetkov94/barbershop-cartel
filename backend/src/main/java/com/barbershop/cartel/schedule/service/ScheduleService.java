package com.barbershop.cartel.schedule.service;

import com.barbershop.cartel.barbers.interfaces.BarberInterface;
import com.barbershop.cartel.clients.entity.ClientEntity;
import com.barbershop.cartel.clients.interfaces.ClientInterface;
import com.barbershop.cartel.schedule.entity.ScheduleEntity;
import com.barbershop.cartel.schedule.interfaces.ScheduleConfigInterface;
import com.barbershop.cartel.schedule.interfaces.ScheduleInterface;
import com.barbershop.cartel.schedule.models.*;
import com.barbershop.cartel.schedule.repository.ScheduleRepository;
import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.barbers.entity.BarberEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
public class ScheduleService implements ScheduleInterface {

    private static final int DAYS_OF_WEEK = 7;
    private static final int MIN_SERVICE_DURATION = 30;
    private static final int MAX_SERVICE_DURATION = 60;

    @Autowired
    private ClientInterface clientInterface;

    @Autowired
    private BarberInterface barberInterface;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private ScheduleConfigInterface scheduleConfigInterface;

    private LocalTime firstAppointment(ScheduleConfigModel configuration) {

        if (configuration.getFirstAppointment() != null) {
            return configuration.getFirstAppointment();
        } else {
            return LocalTime.of(10, 0);
        }
    }

    private LocalTime lastAppointment(ScheduleConfigModel configuration) {

        if (configuration.getLastAppointment() != null) {
            return configuration.getLastAppointment();
        } else {
            return LocalTime.of(19, 0);
        }
    }

    private List<AppointmentHoursModel> getScheduleHours(LocalDate day, long barberId, long serviceId) {

        LocalTime timeNow = LocalTime.now();
        LocalDate today = LocalDate.now();

        List<AppointmentHoursModel> hours = new ArrayList<>();

        Optional<BarberEntity> barber = barberInterface.getBarberById(barberId);

        if (barber.isEmpty()) {
            throw new NullPointerException("Barber is not existing.");
        }

        ServiceEntity service = getService(barber.get(), serviceId);
        List<ScheduleEntity> bookedHours = scheduleRepository.findByDateAndBarber(day, barber.get());
        ScheduleConfigModel configuration = scheduleConfigInterface.getConfigurationByBarberIdAndDate(barberId, day);

        LocalTime currentAppointment = firstAppointment(configuration);
        LocalTime lastAppointment = lastAppointment(configuration);

        hoursLoop:
        while (currentAppointment.isBefore(lastAppointment)) {

            for (ScheduleEntity bookedHour : bookedHours) {

                // if the currentAppointment is existing(booked) skip it, don't create it again.
                if (currentAppointment.equals(bookedHour.getHour())) {
                    currentAppointment = currentAppointment.plusMinutes(MIN_SERVICE_DURATION);
                    continue hoursLoop;
                }
            }

            // if the currentAppointment is already past hour for today, don't create it.
            if (currentAppointment.isBefore(timeNow) && day.equals(today)) {
                currentAppointment = currentAppointment.plusMinutes(MIN_SERVICE_DURATION);
                continue;
            }

            AppointmentHoursModel newHour = new AppointmentHoursModel();
            newHour.setHour(currentAppointment);

            hours.add(newHour);

            currentAppointment = currentAppointment.plusMinutes(MIN_SERVICE_DURATION);
        }

        if (service.getDuration() == MAX_SERVICE_DURATION) {
            hours = availableHoursBasedOnService(hours);
        }

        return hours;
    }

    private List<AppointmentHoursModel> availableHoursBasedOnService(List<AppointmentHoursModel> hours) {

        List<AppointmentHoursModel> availableHours = new ArrayList<>();

        for (int i = 0; i < hours.size(); i++) {

            int nextHourIndex = i + 1;

            if (hours.size() > nextHourIndex) {

                AppointmentHoursModel currentHour = hours.get(i);
                AppointmentHoursModel nextHour = hours.get(nextHourIndex);

                // if nextHour is more than 60 min. ahead from the currentHour means those hours in between are booked and the currentHour cannot be booked with duration of 60 min.
                if (currentHour.getHour().plusMinutes(MAX_SERVICE_DURATION).isBefore(nextHour.getHour())) {
                    continue;
                }

                availableHours.add(currentHour);
            }
        }

        return availableHours;
    }

    private List<AppointmentDayModel> getPreviousWeek(int numberOfWeeks, long barberId, long serviceId) {

        LocalDate today = LocalDate.now();
        final LocalDate startOfPreviousWeek = today.minusWeeks(numberOfWeeks).with(DayOfWeek.MONDAY);

        return createWeek(startOfPreviousWeek, barberId, serviceId);
    }

    private List<AppointmentDayModel> getCurrentWeek(long barberId, long serviceId) {

        LocalDate today = LocalDate.now();
        final LocalDate startOfCurrentWeek = today.with(DayOfWeek.MONDAY);

        return createWeek(startOfCurrentWeek, barberId, serviceId);
    }

    private List<AppointmentDayModel> getNextWeek(int numberOfWeeks, long barberId, long serviceId) {

        LocalDate today = LocalDate.now();
        final LocalDate startOfNextWeek = today.plusWeeks(numberOfWeeks).with(DayOfWeek.MONDAY);

        return createWeek(startOfNextWeek, barberId, serviceId);
    }

    private List<AppointmentDayModel> createWeek(LocalDate startOfWeek, long barberId, long serviceId) {

        List<AppointmentDayModel> week = new ArrayList<>();

        for (int i = 0; i < DAYS_OF_WEEK; i++) {

            LocalDate currentDay = startOfWeek.plusDays(i);
            List<AppointmentHoursModel> scheduleHours = getScheduleHours(currentDay, barberId, serviceId);

            AppointmentDayModel day = new AppointmentDayModel();

            day.setDate(startOfWeek.plusDays(i));
            day.setDayOfWeek(currentDay.getDayOfWeek());
            day.setHours(scheduleHours);

            week.add(day);
        }

        return week;
    }

    private ServiceEntity getService(BarberEntity barber, long serviceId) {

        ServiceEntity service = null;

        for (ServiceEntity selectedService : barber.getServices()) {
            if (selectedService.getId() == serviceId) {
                service = selectedService;
            }
        }

        return service;
    }

    private void saveNewClient(String email, String username) {
        clientInterface.saveNewClient(email, username);
    }

    private ClientEntity getClientByEmail(String email) {

        Optional<ClientEntity> client = clientInterface.findByEmail(email);

        return client.orElse(null);
    }

    private void createAppointment(LocalDate date, LocalTime hour, AppointmentRequestModel requestModel, BarberEntity barber, ServiceEntity service) {

        Optional<ClientEntity> client = clientInterface.findByEmail(requestModel.getClientEmail());

        ScheduleEntity schedule = new ScheduleEntity();

        schedule.setBarber(barber);
        schedule.setService(service);
        schedule.setDate(date);
        schedule.setHour(hour);

        if (client.isPresent()) {
            schedule.setClient(client.get());
        } else {
            saveNewClient(requestModel.getClientEmail(), requestModel.getClientUsername());

            ClientEntity newClient = getClientByEmail(requestModel.getClientEmail());

            schedule.setClient(newClient);
        }

        scheduleRepository.save(schedule);
    }

    @Override
    public AppointmentWeekModel getAppointmentsPreviousWeek(int numberOfWeeks, long barberId, long serviceId) {

        List<AppointmentDayModel> previousWeek = getPreviousWeek(numberOfWeeks, barberId, serviceId);

        AppointmentWeekModel week = new AppointmentWeekModel();
        week.setWeek(previousWeek);

        return week;
    }

    @Override
    public AppointmentWeekModel getAppointmentsCurrentWeek(long barberId, long serviceId) {

        List<AppointmentDayModel> currentWeek = getCurrentWeek(barberId, serviceId);

        AppointmentWeekModel week = new AppointmentWeekModel();
        week.setWeek(currentWeek);

        return week;
    }

    @Override
    public AppointmentWeekModel getAppointmentsNextWeek(int numberOfWeeks, long barberId, long serviceId) {

        List<AppointmentDayModel> nextWeek = getNextWeek(numberOfWeeks, barberId, serviceId);

        AppointmentWeekModel week = new AppointmentWeekModel();
        week.setWeek(nextWeek);

        return week;
    }

    @Override
    public void save(AppointmentRequestModel requestModel) {

        Optional<BarberEntity> barber = barberInterface.getBarberById(requestModel.getBarberId());

        if (barber.isEmpty()) {
            throw new NullPointerException("Barber is not existing.");
        }

        ServiceEntity service = getService(barber.get(), requestModel.getServiceId());

        int numberHoursToBook = service.getDuration() / MIN_SERVICE_DURATION;

        LocalDate date = LocalDate.parse(requestModel.getDate());
        LocalTime hour = LocalTime.parse(requestModel.getHour());

        for (int i = 0; i < numberHoursToBook; i++) {

            createAppointment(date, hour, requestModel, barber.get(), service);

            hour = hour.plusMinutes(MIN_SERVICE_DURATION);
        }
    }
}
