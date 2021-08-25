package com.barbershop.cartel.appointments.service;

import com.barbershop.cartel.appointments.entity.AppointmentEntity;
import com.barbershop.cartel.appointments.interfaces.AppointmentInterface;
import com.barbershop.cartel.appointments.models.AppointmentDayModel;
import com.barbershop.cartel.appointments.models.AppointmentModel;
import com.barbershop.cartel.appointments.repository.AppointmentRepository;
import com.barbershop.cartel.assignments.interfaces.AssignmentInterface;
import com.barbershop.cartel.barbers.interfaces.BarberInterface;
import com.barbershop.cartel.clients.entity.ClientEntity;
import com.barbershop.cartel.clients.interfaces.ClientInterface;
import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import com.barbershop.cartel.notifications.email.interfaces.EmailDetailInterface;
import com.barbershop.cartel.notifications.websocket.WebSocketService;
import com.barbershop.cartel.utils.InternationalString;
import com.barbershop.cartel.utils.ListUtils;
import com.barbershop.cartel.work.weekday.WorkWeekDayEntity;
import com.barbershop.cartel.work.weekday.WorkWeekDayRepository;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toList;

@Slf4j
@Service
public class AppointmentService implements AppointmentInterface {

    private static final int MIN_SERVICE_DURATION = 30;

    @Autowired
    private ClientInterface clientInterface;

    @Autowired
    private BarberInterface barberInterface;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AssignmentInterface assignmentInterface;

    @Autowired
    private EmailDetailInterface emailDetailInterface;

    @Autowired
    private WorkWeekDayRepository workWeekDayRepository;

    @Autowired
    private WebSocketService webSocketService;

    private boolean overlapsWithExisting(AppointmentEntity entity) {
        return appointmentRepository.existsBetween(entity.getBarber().getId(), entity.getStartTime(), entity.getEndTime());
    }

    private ClientEntity createClient(String email, String phoneNumber, String username) {
        return clientInterface.createClient(email, phoneNumber, username);
    }

    private boolean collidesWith(AppointmentModel appointment, LocalDateTime start, LocalDateTime end) {

        val appointmentStart = appointment.getStart();
        val appointmentEnd = appointment.getEnd();

        val doesNotCollide = end.compareTo(appointmentStart) <= 0 ||
                appointmentEnd.compareTo(start) <= 0;

        return !doesNotCollide;
    }

    @Override
    public List<AppointmentDayModel> getAppointmentsNextWeek(long assignmentId, int numberOfWeeks) {

        val assignment = assignmentInterface.getAssignment(assignmentId);

        val today = LocalDate.now();
        val startOfWeekDate = today
                .with(ChronoField.DAY_OF_WEEK, 1)
                .plusWeeks(numberOfWeeks);

        val startDateTime = startOfWeekDate.atStartOfDay();
        val endDateTime = startOfWeekDate.plusWeeks(1).atStartOfDay();

        val barberId = assignment.getBarber().getId();
        val appointments = appointmentRepository.findBetween(barberId, startDateTime, endDateTime)
                .stream().map(this::toAppointmentModel).collect(toList());

        val weeklySystemAppointments = getWeeklySystemAppointments(new long[]{barberId}, startDateTime, endDateTime);
        appointments.addAll(weeklySystemAppointments);

        //time slot represents a clickable button in the frontend
        var timeSlotStart = startDateTime;

        val startTimes = new ArrayList<LocalDateTime>();

        val currentTime = LocalDateTime.now();

        while (timeSlotStart.isBefore(endDateTime)) {

            //skip past time slots
            while(timeSlotStart.compareTo(currentTime) < 0)
                timeSlotStart = timeSlotStart.plus(MIN_SERVICE_DURATION, ChronoUnit.MINUTES);

            val timeSlotEnd = timeSlotStart.plus(assignment.getDuration(), ChronoUnit.MINUTES);

            LocalDateTime finalTimeSlotStart = timeSlotStart;
            val collidesWithExisting = appointments.stream().filter(x -> collidesWith(x, finalTimeSlotStart, timeSlotEnd)).findFirst();

            if (collidesWithExisting.isEmpty()) {
                //create timeSlot
                startTimes.add(timeSlotStart);
            } else {
                val entity = collidesWithExisting.get();
                String eventTitle = "Custom Event";

                log.info("TimeSlot({},{}) collides with {} ({} - {})", timeSlotStart, timeSlotEnd, eventTitle, entity.getStart(), entity.getEnd());
            }

            timeSlotStart = timeSlotStart.plus(MIN_SERVICE_DURATION, ChronoUnit.MINUTES);
        }

        val week = startTimes.stream().collect(groupingBy(LocalDateTime::toLocalDate));

        val result = new ArrayList<AppointmentDayModel>();

        for(LocalDate date : startOfWeekDate.datesUntil(startOfWeekDate.plusWeeks(1)).collect(toList())){
            List<LocalTime> hours;
            if(week.containsKey(date)){
                hours = week.get(date).stream().map(LocalDateTime::toLocalTime).collect(toList());

            } else {
                hours = new ArrayList<>();
            }

            val appointment = new AppointmentDayModel(date, date.getDayOfWeek(), hours, date.equals(today));

            result.add(appointment);
        }

        return result;
    }

    @Override
    public List<AppointmentModel> getAppointments(long[] barberIds, LocalDateTime from, LocalDateTime to) {

        var result = appointmentRepository.findByBarberIdIn(barberIds).stream()
                .map(this::toAppointmentModel)
                .filter(x -> collidesWith(x, from, to))
                .collect(toList());

        List<AppointmentModel> appointments = getWeeklySystemAppointments(barberIds, from, to);

        result.addAll(appointments);

        return result;
    }

    @Override
    public void create(AppointmentModel appointmentModel, boolean allowOverlap) {

        AppointmentEntity entity = new AppointmentEntity();

        setData(appointmentModel, entity);

        if (!allowOverlap) {
            if (overlapsWithExisting(entity)) {
                return;
            }
        }

        appointmentRepository.save(entity);

        webSocketService.updateClientCalendars();
    }

    @Override
    public void update(AppointmentModel appointmentModel) {

        val byId = appointmentRepository.findById(appointmentModel.getId());

        if (byId.isEmpty())
            return;

        val entity = byId.get();

        setData(appointmentModel, entity);

        appointmentRepository.save(entity);

        webSocketService.updateClientCalendars();
    }

    private void setData(AppointmentModel appointmentModel, AppointmentEntity entity) {
        entity.setStartTime(appointmentModel.getStart());
        entity.setEndTime(appointmentModel.getEnd());

        ClientEntity client = clientInterface.findByEmail(appointmentModel.getEmail())
                .orElseGet(() -> createClient(appointmentModel.getEmail(), appointmentModel.getPhone(), appointmentModel.getName()));

        client.setPhoneNumber(appointmentModel.getPhone());
        client.setUsername(appointmentModel.getName());

        entity.setClient(client);

        var barber = barberInterface.getBarberById(appointmentModel.getBarberId());

        entity.setBarber(barber);

        if (appointmentModel.getAssignmentId() != null) {
            val assignment = assignmentInterface.getAssignment(appointmentModel.getAssignmentId());

            entity.setService(assignment.getService());
        }
    }

    @Override
    public void delete(long id) {
        appointmentRepository.deleteById(id);

        webSocketService.updateClientCalendars();
    }

    private AppointmentModel toAppointmentModel(AppointmentEntity x) {

        AppointmentModel appointmentModel = new AppointmentModel();

        appointmentModel.setId(x.getId());

        appointmentModel.setBarberId(x.getBarber().getId());

        InternationalString barberName = new InternationalString();
        barberName.put(LanguageEnum.bg, x.getBarber().getFirstName().get(LanguageEnum.bg) + " " + x.getBarber().getLastName().get(LanguageEnum.bg));
        barberName.put(LanguageEnum.en, x.getBarber().getFirstName().get(LanguageEnum.en) + " " + x.getBarber().getLastName().get(LanguageEnum.en));

        appointmentModel.setBarberName(barberName);

        appointmentModel.setStart(x.getStartTime());
        appointmentModel.setEnd(x.getEndTime());

        if (x.getService() != null)
            appointmentModel.setServiceName(x.getService().getServiceTitle());

        val client = x.getClient();

        if (client != null) {
            appointmentModel.setEmail(client.getEmail());
            appointmentModel.setPhone(client.getPhoneNumber());
            appointmentModel.setName(client.getUsername());
        }

        return appointmentModel;
    }


    public List<AppointmentModel> getWeeklySystemAppointments(long[] barberIds, LocalDateTime from, LocalDateTime to) {

        final Map<DayOfWeek, List<WorkWeekDayEntity>> dayToWeekDay = workWeekDayRepository.findByBarberIdIn(barberIds).stream()
                .collect(groupingBy(WorkWeekDayEntity::getDayOfWeek));

        var result = from.toLocalDate().datesUntil(to.toLocalDate())
                .map(x -> getAppointmentModel(x, dayToWeekDay.get(x.getDayOfWeek())))
                .collect(Collectors.toList());

        return ListUtils.flattenListOfListsStream(result);
    }

    private List<AppointmentModel> getAppointmentModel(LocalDate date, List<WorkWeekDayEntity> workWeekDayEntities) {

        var list = new ArrayList<AppointmentModel>();

        for (var workWeekDayEntity : workWeekDayEntities) {

            final long barberId = workWeekDayEntity.getBarber().getId();

            InternationalString firstName = workWeekDayEntity.getBarber().getFirstName();
            InternationalString lastName = workWeekDayEntity.getBarber().getLastName();

            InternationalString barberName = new InternationalString();

            for (Map.Entry<LanguageEnum, String> languageEnumStringEntry : firstName.entrySet()) {
                LanguageEnum key = languageEnumStringEntry.getKey();
                String fullName = String.format("%s %s", firstName.get(key), lastName.get(key));

                barberName.put(languageEnumStringEntry.getKey(), fullName);
            }

            if (workWeekDayEntity.isNotWorking()) {
                var result = new AppointmentModel();

                result.id = -1L;
                result.barberId = barberId;
                result.start = date.atStartOfDay();
                result.end = date.atTime(LocalTime.MAX);
                result.barberName = barberName;
                result.setAssignmentId(null);

                list.add(result);

                continue;
            }

            var result = new AppointmentModel();

            result.id = -1L;
            result.barberId = barberId;
            result.start = date.atStartOfDay();
            result.end = date.atStartOfDay().with(workWeekDayEntity.getFrom());
            result.barberName = barberName;
            result.setAssignmentId(null);


            list.add(result);
            var result2 = new AppointmentModel();

            result2.id = -1L;
            result2.barberId = barberId;
            result2.start = date.atStartOfDay().with(workWeekDayEntity.getTo());
            result2.end = date.atTime(LocalTime.MAX);
            result2.barberName = barberName;
            result2.setAssignmentId(null);

            list.add(result2);
        }

        return list;
    }
}
