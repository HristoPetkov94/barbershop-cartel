package com.barbershop.cartel.appointments.service;

import com.barbershop.cartel.assignments.entity.AssignmentEntity;
import com.barbershop.cartel.assignments.interfaces.AssignmentInterface;
import com.barbershop.cartel.barbers.interfaces.BarberInterface;
import com.barbershop.cartel.clients.entity.ClientEntity;
import com.barbershop.cartel.clients.interfaces.ClientInterface;
import com.barbershop.cartel.appointments.entity.AppointmentEntity;
import com.barbershop.cartel.appointments.interfaces.ScheduleConfigInterface;
import com.barbershop.cartel.appointments.interfaces.AppointmentInterface;
import com.barbershop.cartel.appointments.models.*;
import com.barbershop.cartel.appointments.repository.AppointmentRepository;
import com.barbershop.cartel.notifications.email.interfaces.EmailDetailInterface;
import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.services.interfaces.ServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
public class AppointmentService implements AppointmentInterface {

    private static final int DAYS_OF_WEEK = 7;
    private static final int MIN_SERVICE_DURATION = 30;
    private static final int MAX_SERVICE_DURATION = 60;

    @Autowired
    private ClientInterface clientInterface;

    @Autowired
    private BarberInterface barberInterface;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ScheduleConfigInterface scheduleConfigInterface;

    @Autowired
    private AssignmentInterface assignmentInterface;

    @Autowired
    private ServiceInterface serviceInterface;

    @Autowired
    private EmailDetailInterface emailDetailInterface;

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

    private List<AppointmentHoursModel> getScheduleHours(LocalDate day, long assignmentId) {

        List<AppointmentHoursModel> hours = new ArrayList<>();

        AssignmentEntity assignment = assignmentInterface.getAssignment(assignmentId);

        long barberId = assignment.getBarber().getId();

        List<AppointmentEntity> bookedHours = appointmentRepository.findByDateAndBarberId(day, barberId);
        ScheduleConfigModel configuration = scheduleConfigInterface.getConfigurationByBarberIdAndDate(barberId, null);

        LocalTime currentAppointment = firstAppointment(configuration);
        LocalTime lastAppointment = lastAppointment(configuration);

        int duration = assignment.getDuration();

        hoursLoop:
        while (currentAppointment.isBefore(lastAppointment)) {

            LocalTime currentAppointmentEndTime = currentAppointment.plusMinutes(duration);

            for (AppointmentEntity bookedHour : bookedHours) {

                LocalTime startTime = bookedHour.getStartTime();
                LocalTime endTime = bookedHour.getEndTime();

                if ((currentAppointmentEndTime.isAfter(startTime) && currentAppointment.isBefore(endTime)) || currentAppointmentEndTime.isAfter(lastAppointment)) {
                    currentAppointment = currentAppointment.plusMinutes(MIN_SERVICE_DURATION);
                    continue hoursLoop;
                }
            }

            AppointmentHoursModel newHour = new AppointmentHoursModel();
            newHour.setTime(currentAppointment);

            hours.add(newHour);

            currentAppointment = currentAppointment.plusMinutes(MIN_SERVICE_DURATION);
        }

        return hours;
    }

    private List<AppointmentDayModel> getPreviousWeek(int numberOfWeeks, long assignmentId) {

        LocalDate today = LocalDate.now();
        final LocalDate startOfPreviousWeek = today.minusWeeks(numberOfWeeks).with(DayOfWeek.MONDAY);

        return createWeek(startOfPreviousWeek, today, assignmentId);
    }

    private List<AppointmentDayModel> getCurrentWeek(long assignmentId) {

        LocalDate today = LocalDate.now();
        final LocalDate startOfCurrentWeek = today.with(DayOfWeek.MONDAY);

        return createWeek(startOfCurrentWeek, today, assignmentId);
    }

    private List<AppointmentDayModel> getNextWeek(int numberOfWeeks, long assignmentId) {

        LocalDate today = LocalDate.now();
        final LocalDate startOfNextWeek = today.plusWeeks(numberOfWeeks).with(DayOfWeek.MONDAY);

        return createWeek(startOfNextWeek, today, assignmentId);
    }

    private List<AppointmentDayModel> createWeek(LocalDate startOfWeek, LocalDate today, long assignmentId) {

        List<AppointmentDayModel> week = new ArrayList<>();

        for (int i = 0; i < DAYS_OF_WEEK; i++) {

            LocalDate currentDay = startOfWeek.plusDays(i);

            List<AppointmentHoursModel> scheduleHours = new ArrayList<>();

            if (currentDay.isEqual(today) || currentDay.isAfter(today)) {
                scheduleHours = getScheduleHours(currentDay, assignmentId);
            }

            boolean isToday = today.equals(currentDay);

            AppointmentDayModel day = new AppointmentDayModel();

            day.setDate(startOfWeek.plusDays(i));
            day.setDayOfWeek(currentDay.getDayOfWeek());
            day.setHours(scheduleHours);
            day.setToday(isToday);

            week.add(day);
        }

        return week;
    }

    private ClientEntity createClient(String email, String username) {
        return clientInterface.createClient(email, username);
    }

    private void createAppointment(AppointmentRequestModel appointmentModel) {

        AssignmentEntity assignment = assignmentInterface.getAssignment(appointmentModel.getAssignmentId());

        long barberId = assignment.getBarber().getId();
        long serviceId = assignment.getService().getId();

        BarberEntity barber = barberInterface.getBarberById(barberId);
        ServiceEntity service = serviceInterface.getServiceById(serviceId);

        String clientEmail = appointmentModel.getClientEmail();

        ClientEntity client = clientInterface.findByEmail(clientEmail)
                .orElseGet(() -> createClient(clientEmail, appointmentModel.getClientUsername()));


        LocalDate date = LocalDate.parse(appointmentModel.getDate());
        LocalTime startTime = LocalTime.parse(appointmentModel.getHour());
        LocalTime endTime = startTime.plusMinutes(assignment.getDuration());

        AppointmentEntity appointment = new AppointmentEntity();

        appointment.setDate(date);
        appointment.setStartTime(startTime);
        appointment.setEndTime(endTime);
        appointment.setPrice(assignment.getPrice());
        appointment.setDuration(assignment.getDuration());
        appointment.setBarber(barber);
        appointment.setService(service);
        appointment.setClient(client);

        appointmentRepository.save(appointment);
    }

    @Override
    public AppointmentWeekModel getAppointmentsPreviousWeek(int numberOfWeeks, long assignmentId) {

        List<AppointmentDayModel> previousWeek = getPreviousWeek(numberOfWeeks, assignmentId);

        AppointmentWeekModel week = new AppointmentWeekModel();
        week.setDays(previousWeek);

        return week;
    }

    @Override
    public AppointmentWeekModel getAppointmentsCurrentWeek(long assignmentId) {

        List<AppointmentDayModel> currentWeek = getCurrentWeek(assignmentId);

        AppointmentWeekModel week = new AppointmentWeekModel();
        week.setDays(currentWeek);

        return week;
    }

    @Override
    public AppointmentWeekModel getAppointmentsNextWeek(int numberOfWeeks, long assignmentId) {

        List<AppointmentDayModel> nextWeek = getNextWeek(numberOfWeeks, assignmentId);

        AppointmentWeekModel week = new AppointmentWeekModel();
        week.setDays(nextWeek);

        return week;
    }

    @Override
    public void save(AppointmentRequestModel appointmentModel) {

        createAppointment(appointmentModel);

        String toRecipient = appointmentModel.getClientEmail();

        emailDetailInterface.sendBookingConfirmationMessage(toRecipient);
    }
}
