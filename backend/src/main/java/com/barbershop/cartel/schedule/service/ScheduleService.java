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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService implements ScheduleInterface {

    private static final LocalDate TODAY = LocalDate.now();
    private static final int DAYS_OF_WEEK = 7;
    private static final int MIN_SERVICE_DURATION = 30;

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

        while (currentAppointment.isBefore(lastAppointment)) {

            AppointmentHoursModel newHour = new AppointmentHoursModel();
            newHour.setHour(currentAppointment);

            for (ScheduleEntity hour : bookedHours) {

                LocalTime bookedHour = hour.getHour();

                if (currentAppointment.equals(bookedHour) && hour.getDate().equals(day)) {
                    newHour.setBooked(true);
                    break;
                }
            }

            hours.add(newHour);
            currentAppointment = currentAppointment.plusMinutes(MIN_SERVICE_DURATION);
        }

        return availableHoursBasedOnService(hours, service);
    }

    private List<AppointmentHoursModel> availableHoursBasedOnService(List<AppointmentHoursModel> hours, ServiceEntity service) {

        List<AppointmentHoursModel> availableHours = new ArrayList<>();

        int hoursInAdvance = service.getDuration() / MIN_SERVICE_DURATION;

        hoursLoop:
        for (int i = 0; i < hours.size(); i++) {

            boolean booked = false;

            // this loop is checking the hours in advance if are available
            for (int j = i; j < hoursInAdvance + i; j++) {

                if (j == hours.size()) {
                    break hoursLoop;
                }

                booked = hours.get(j).isBooked();

                if (booked) {
                    break;
                }
            }

            if (!booked) {
                availableHours.add(hours.get(i));
            }
        }

        return availableHours;
    }

    private List<AppointmentDayModel> getAppointmentDayModels(LocalDate from, LocalDate to, long barberId) {

        List<AppointmentDayModel> days = new ArrayList<>();

        while (from.isBefore(to) || from.isEqual(to)) {

            AppointmentDayModel day = new AppointmentDayModel();
            day.setDate(from);
            day.setDayOfWeek(from.getDayOfWeek());
            day.setHours(getScheduleHours(from, barberId, 0L));

            days.add(day);

            from = from.plusDays(1);
        }

        return days;
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

    private List<AppointmentDayModel> getPreviousWeek(int numberOfWeeks, long barberId, long serviceId) {

        final LocalDate startOfPreviousWeek = TODAY.minusWeeks(numberOfWeeks).with(DayOfWeek.MONDAY);

        return createWeek(startOfPreviousWeek, barberId, serviceId);
    }

    private List<AppointmentDayModel> getCurrentWeek(long barberId, long serviceId) {

        final LocalDate startOfCurrentWeek = TODAY.with(DayOfWeek.MONDAY);

        return createWeek(startOfCurrentWeek, barberId, serviceId);
    }

    private List<AppointmentDayModel> getNextWeek(int numberOfWeeks, long barberId, long serviceId) {

        final LocalDate startOfNextWeek = TODAY.plusWeeks(numberOfWeeks).with(DayOfWeek.MONDAY);

        return createWeek(startOfNextWeek, barberId, serviceId);
    }

    private List<AppointmentDayModel> createWeek(LocalDate startOfWeek, long barberId, long serviceId) {

        List<AppointmentDayModel> week = new ArrayList<>();

        for (int i = 0; i < DAYS_OF_WEEK; i++) {

            LocalDate currentDay = startOfWeek.plusDays(i);

            AppointmentDayModel day = new AppointmentDayModel();

            day.setDate(startOfWeek.plusDays(i));
            day.setDayOfWeek(currentDay.getDayOfWeek());
            day.setHours(getScheduleHours(currentDay, barberId, serviceId));

            week.add(day);
        }

        return week;
    }

    @Override
    public AppointmentWeekModel getAppointmentsPreviousWeek(int numberOfWeeks, long barberId, long serviceId) {

        AppointmentWeekModel week = new AppointmentWeekModel();
        week.setWeek(getPreviousWeek(numberOfWeeks, barberId, serviceId));

        return week;
    }

    @Override
    public AppointmentWeekModel getAppointmentsCurrentWeek(long barberId, long serviceId) {

        AppointmentWeekModel week = new AppointmentWeekModel();
        week.setWeek(getCurrentWeek(barberId, serviceId));

        return week;
    }

    @Override
    public AppointmentWeekModel getAppointmentsNextWeek(int numberOfWeeks, long barberId, long serviceId) {

        AppointmentWeekModel week = new AppointmentWeekModel();
        week.setWeek(getNextWeek(numberOfWeeks, barberId, serviceId));

        return week;
    }

    @Override
    public AppointmentWeekModel getAppointmentsByBarberAndDates(long barberId, LocalDate from, LocalDate to) {

        List<AppointmentDayModel> days = getAppointmentDayModels(from, to, barberId);

        AppointmentWeekModel week = new AppointmentWeekModel();
        week.setWeek(days);

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
