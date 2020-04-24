package com.barbershop.cartel.schedule.service;

import com.barbershop.cartel.clients.entity.ClientEntity;
import com.barbershop.cartel.clients.interfaces.ClientInterface;
import com.barbershop.cartel.schedule.entity.ScheduleEntity;
import com.barbershop.cartel.schedule.interfaces.ScheduleConfigInterface;
import com.barbershop.cartel.schedule.interfaces.ScheduleInterface;
import com.barbershop.cartel.schedule.models.*;
import com.barbershop.cartel.schedule.repository.ScheduleRepository;
import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.services.interfaces.ServiceInterface;
import com.barbershop.cartel.services.models.ServiceModel;
import com.barbershop.cartel.users.entity.UserDetailsEntity;
import com.barbershop.cartel.users.interfaces.UserDetailsInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService implements ScheduleInterface {

    private static final int MIN_SERVICE_DURATION = 30;

    @Autowired
    private ServiceInterface serviceInterface;

    @Autowired
    private ClientInterface clientInterface;

    @Autowired
    private UserDetailsInterface userDetailsInterface;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private ScheduleConfigInterface scheduleConfigInterface;

    private LocalTime firstAppointment(ScheduleConfigModel configuration) {

        if (configuration != null) {
            return configuration.getFirstAppointment();
        } else {
            return LocalTime.of(10, 0);
        }
    }

    private LocalTime lastAppointment(ScheduleConfigModel configuration) {

        if (configuration != null) {
            return configuration.getLastAppointment();
        } else {
            return LocalTime.of(19, 0);
        }
    }

    private List<AppointmentHoursModel> getScheduleHours(long barberId, LocalDate day) {

        List<AppointmentHoursModel> hours = new ArrayList<>();

        Optional<UserDetailsEntity> barber = userDetailsInterface.getBarberById(barberId);
        List<ScheduleEntity> bookedHours = scheduleRepository.findByDateAndBarber(day, barber.get());
        ScheduleConfigModel configuration = scheduleConfigInterface.getConfigurationByBarberIdAndDate(barberId, day);

        LocalTime currentAppointment = firstAppointment(configuration);
        LocalTime lastAppointment = lastAppointment(configuration);

        if (configuration.isWorkingDay()) {

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
                currentAppointment = currentAppointment.plusMinutes(30);
            }
        }

        return hours;
    }

    private List<AppointmentDayModel> getDaysFrom(LocalDate today, long barberId) {

        List<AppointmentDayModel> days = new ArrayList<>();

        for (long i = 0; i < 7; i++) {

            LocalDate currentDay = today.plusDays(i);

            AppointmentDayModel day = new AppointmentDayModel();
            day.setDate(currentDay);
            day.setDayOfWeek(currentDay.getDayOfWeek());
            day.setHours(getScheduleHours(barberId, currentDay));

            days.add(day);
        }

        return days;
    }

    private void saveNewClient(String email, String username) {
        clientInterface.saveNewClient(email, username);
    }

    private ClientEntity getClientByEmail(String email) {

        Optional<ClientEntity> client = clientInterface.findByEmail(email);

        return client.orElse(null);
    }

    private void createAppointment(LocalDate date, LocalTime hour, AppointmentRequestModel requestModel, UserDetailsEntity barber, ServiceEntity service) {

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
    public AppointmentWeekModel getAppointmentCurrentWeek(long barberId) {

        LocalDate today = LocalDate.now();

        AppointmentWeekModel week = new AppointmentWeekModel();
        week.setDays(getDaysFrom(today, barberId));

        return week;
    }

    @Override
    public AppointmentWeekModel getAppointmentNextWeek(AppointmentWeekModel currentWeek, long barberId) {

        List<AppointmentDayModel> days = currentWeek.getDays();

        int lastDayIndex = currentWeek.getDays().size() - 1;
        AppointmentDayModel lastDay = days.get(lastDayIndex);
        LocalDate day = lastDay.getDate().plusDays(1);

        AppointmentWeekModel nextWeek = new AppointmentWeekModel();
        nextWeek.setDays(getDaysFrom(day, barberId));

        return nextWeek;
    }

    @Override
    public AppointmentWeekModel getAppointmentPreviousWeek(AppointmentWeekModel currentWeek, long barberId) {

        List<AppointmentDayModel> days = currentWeek.getDays();

        AppointmentDayModel firstDay = days.get(0);
        LocalDate day = firstDay.getDate().minusDays(7);

        AppointmentWeekModel previousWeek = new AppointmentWeekModel();
        previousWeek.setDays(getDaysFrom(day, barberId));

        return previousWeek;
    }

    @Override
    public void save(AppointmentRequestModel requestModel) {
        /*
         * Creating services only for test purposes.
         * TODO:When GUI is done this should be deleted.
         * */
        ServiceModel servm = new ServiceModel();

        servm.setServiceType("kosta");
        servm.setPriceBGN(20);
        servm.setDuration(60);
        servm.setDescription("service.getDescription()");

        serviceInterface.save(servm);

        Optional<UserDetailsEntity> barber = userDetailsInterface.getBarberById(requestModel.getBarberId());
        Optional<ServiceEntity> service = serviceInterface.getServiceById(requestModel.getServiceId());

        if (barber.isPresent() && service.isPresent()) {

            int numberHoursToBook = service.get().getDuration() / MIN_SERVICE_DURATION;

            LocalDate date = LocalDate.parse(requestModel.getDate());
            LocalTime hour = LocalTime.parse(requestModel.getHour());

            for (int i = 0; i < numberHoursToBook; i++) {

                createAppointment(date, hour, requestModel, barber.get(), service.get());

                hour = hour.plusMinutes(30);
            }
        }
    }
}
