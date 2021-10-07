package com.barbershop.cartel.appointments.service;

import com.barbershop.cartel.appointments.entity.AppointmentEntity;
import com.barbershop.cartel.appointments.interfaces.AppointmentInterface;
import com.barbershop.cartel.appointments.models.AppointmentDayModel;
import com.barbershop.cartel.appointments.models.AppointmentModel;
import com.barbershop.cartel.appointments.repository.AppointmentRepository;
import com.barbershop.cartel.assignments.interfaces.AssignmentInterface;
import com.barbershop.cartel.barbers.interfaces.BarberInterface;
import com.barbershop.cartel.clients.interfaces.ClientInterface;
import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import com.barbershop.cartel.notifications.email.interfaces.EmailDetailInterface;
import com.barbershop.cartel.notifications.email.service.EmailService;
import com.barbershop.cartel.notifications.websocket.WebSocketService;
import com.barbershop.cartel.utils.InternationalString;
import com.barbershop.cartel.utils.ListUtils;
import com.barbershop.cartel.work.weekday.WorkWeekDayEntity;
import com.barbershop.cartel.work.weekday.WorkWeekDayRepository;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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

    @Autowired
    private EmailService emailService;

    private boolean overlapsWithExisting(AppointmentEntity entity) {

        val barberId = entity.getBarber().getId();

        val start = entity.getStartTime();
        val end = entity.getEndTime();

        return appointmentRepository.existsBetween(barberId, start, end);
    }

    private boolean collidesWith(AppointmentModel appointment, LocalDateTime start, LocalDateTime end) {

        val appointmentStart = appointment.getStart();
        val appointmentEnd = appointment.getEnd();

        val doesNotCollide = end.compareTo(appointmentStart) <= 0 ||
                appointmentEnd.compareTo(start) <= 0;

        return !doesNotCollide;
    }

    @Override
    public List<AppointmentDayModel> getAppointmentDayModels(long assignmentId, LocalDate from, LocalDate to) {

        val assignment = assignmentInterface.getAssignment(assignmentId);

        val today = LocalDate.now();

        val startDateTime = from.atStartOfDay();
        val endDateTime = to.plusWeeks(1).atStartOfDay();

        val barberId = assignment.get().getBarber().getId();
        val appointments = appointmentRepository.findBetween(barberId, startDateTime, endDateTime)
                .stream().map(this::toAppointmentModel).collect(toList());

        val weeklyNotWorkingAppointments = getWeeklyNotWorkingAppointments(new long[]{barberId}, startDateTime, endDateTime);
        appointments.addAll(weeklyNotWorkingAppointments);

        //time slot represents a clickable button in the frontend
        var timeSlotStart = startDateTime;

        val startTimes = new ArrayList<LocalDateTime>();

        val currentTime = LocalDateTime.now();

        while (timeSlotStart.isBefore(endDateTime)) {

            //skip past time slots
            while (timeSlotStart.compareTo(currentTime) < 0)
                timeSlotStart = timeSlotStart.plus(MIN_SERVICE_DURATION, ChronoUnit.MINUTES);

            val timeSlotEnd = timeSlotStart.plus(assignment.get().getDuration(), ChronoUnit.MINUTES);

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

        from.datesUntil(to.plusDays(1)).forEach( date -> {

            List<LocalTime> hours;
            if (week.containsKey(date)) {
                hours = week.get(date).stream().map(LocalDateTime::toLocalTime).collect(toList());

            } else {
                hours = new ArrayList<>();
            }

            val appointment = new AppointmentDayModel(date, date.getDayOfWeek(), hours, date.equals(today));

            result.add(appointment);
        });

        return result;
    }

    @Override
    public List<AppointmentModel> getAppointments(long[] barberIds, LocalDateTime from, LocalDateTime to) {

        var result = appointmentRepository.findByBarberIdIn(barberIds).stream()
                .map(this::toAppointmentModel)
                .filter(x -> collidesWith(x, from, to))
                .collect(toList());

        List<AppointmentModel> appointments = getWeeklyNotWorkingAppointments(barberIds, from, to);

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

        createClient(appointmentModel);

        appointmentRepository.save(entity);

        webSocketService.updateClientCalendars();

        try {
            emailService.sendBookingConfirmationMessage(entity.getEmail(), LanguageEnum.bg);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void update(AppointmentModel appointmentModel) {

        val byId = appointmentRepository.findById(appointmentModel.getId());

        if (byId.isEmpty())
            return;

        val entity = byId.get();

        setData(appointmentModel, entity);

        createClient(appointmentModel);

        appointmentRepository.save(entity);

        webSocketService.updateClientCalendars();
    }

    private void createClient(AppointmentModel appointmentModel) {

        if (clientInterface.findByPhone(appointmentModel.getPhone()).isEmpty()) {

            clientInterface.createClient(appointmentModel.getEmail(),
                    appointmentModel.getPhone(),
                    appointmentModel.getName());
        }
    }

    private void setData(AppointmentModel appointmentModel, AppointmentEntity entity) {

        entity.setStartTime(appointmentModel.getStart());
        entity.setEndTime(appointmentModel.getEnd());


        entity.setEmail(appointmentModel.getEmail());
        entity.setPhone(appointmentModel.getPhone());
        entity.setName(appointmentModel.getName());

        boolean noShow = false;
        if (appointmentModel.getNoShow() != null)
            noShow = appointmentModel.getNoShow();

        entity.setNoShow(noShow);

        var barber = barberInterface.getBarberById(appointmentModel.getBarberId());

        entity.setBarber(barber);

        if (appointmentModel.getAssignmentId() != null) {
            assignmentInterface.getAssignment(appointmentModel.getAssignmentId()).ifPresent(assignment ->
                    entity.setService(assignment.getService())
            );
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

        val barberEntity = x.getBarber();
        val barberId = barberEntity.getId();

        if (x.getService() != null) {
            assignmentInterface.getAssignment(barberId, x.getService().getId()).ifPresent(assignment ->
                    appointmentModel.setAssignmentId(assignment.getId())
            );
        }

        appointmentModel.setBarberId(barberId);

        InternationalString barberName = barberEntity.getFirstName().concatenate(" ", barberEntity.getLastName());
        appointmentModel.setBarberName(barberName);

        appointmentModel.setStart(x.getStartTime());
        appointmentModel.setEnd(x.getEndTime());

        if (x.getService() != null)
            appointmentModel.setServiceName(x.getService().getServiceTitle());

        appointmentModel.setEmail(x.getEmail());
        appointmentModel.setPhone(x.getPhone());
        appointmentModel.setName(x.getName());

        appointmentModel.setNoShow(x.isNoShow());

        return appointmentModel;
    }

    public List<AppointmentModel> getWeeklyNotWorkingAppointments(long[] barberIds, LocalDateTime from, LocalDateTime to) {

        final Map<DayOfWeek, List<WorkWeekDayEntity>> dayToWeekDay = workWeekDayRepository.findByBarberIdIn(barberIds).stream()
                .collect(groupingBy(WorkWeekDayEntity::getDayOfWeek));

        var result = from.toLocalDate().datesUntil(to.toLocalDate())
                .map(x -> getAppointmentModel(x, dayToWeekDay.get(x.getDayOfWeek())))
                .collect(Collectors.toList());

        return ListUtils.flattenListOfListsStream(result);
    }

    //creates virtual appointments for a dayOfWeek
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

            val amAppointment = createSystemAppointment(barberId, barberName);

            amAppointment.setStart(date.atStartOfDay());

            list.add(amAppointment);

            if(workWeekDayEntity.isNotWorking()) {
                amAppointment.setEnd(date.atTime(LocalTime.MAX));
                continue;
            }

            amAppointment.setEnd(date.atStartOfDay().with(workWeekDayEntity.getFrom()));


            val pmAppointment = createSystemAppointment(barberId, barberName);

            pmAppointment.setStart(date.atStartOfDay().with(workWeekDayEntity.getTo()));
            pmAppointment.setEnd(date.atTime(LocalTime.MAX));

            list.add(pmAppointment);
        }

        return list;
    }

    private AppointmentModel createSystemAppointment(long barberId, InternationalString barberName) {

        var result = new AppointmentModel();

        result.setId(-1L);
        result.setBarberId(barberId);
        result.setBarberName(barberName);
        result.setAssignmentId(null);

        return result;
    }
}
