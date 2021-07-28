package com.barbershop.cartel.appointments.service;

import com.barbershop.cartel.appointments.interfaces.ScheduleConfigInterface;
import com.barbershop.cartel.appointments.models.AppointmentModel;
import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import com.barbershop.cartel.utils.InternationalLanguage;
import com.barbershop.cartel.utils.ListUtils;
import com.barbershop.cartel.work.day.WorkDayEntity;
import com.barbershop.cartel.work.day.WorkDayRepository;
import com.barbershop.cartel.work.weekday.WorkWeekDayEntity;
import com.barbershop.cartel.work.weekday.WorkWeekDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.groupingBy;

@Service
public class ScheduleConfigService implements ScheduleConfigInterface {

    @Autowired
    private WorkWeekDayRepository workWeekDayRepository;

    @Autowired
    private WorkDayRepository workDayRepository;


    @Override
    public List<AppointmentModel> getAppointments(long[] barberIds, LocalDateTime from, LocalDateTime to) {

        final Map<DayOfWeek, List<WorkWeekDayEntity>> dayToWeekDay = workWeekDayRepository.findByBarberIdIn(barberIds).stream()
                .collect(groupingBy(WorkWeekDayEntity::getDayOfWeek));

        final List<WorkDayEntity> overrides = workDayRepository.findAllByBarberIdInAndDayAfterAndDayBefore(barberIds, from.toLocalDate().minusDays(1), to.toLocalDate());

        var result = from.toLocalDate().datesUntil(to.toLocalDate())
                .map(x -> getAppointmentModel(x, dayToWeekDay.get(x.getDayOfWeek()), overrides))
                .collect(Collectors.toList());

        return ListUtils.flattenListOfListsStream(result);
    }

    private List<AppointmentModel> getAppointmentModel(LocalDate date, List<WorkWeekDayEntity> workWeekDayEntities, List<WorkDayEntity> overrides) {

        var list = new ArrayList<AppointmentModel>();

        for (var workWeekDayEntity : workWeekDayEntities) {

            final long barberId = workWeekDayEntity.getBarber().getId();

            // TODO: to think a way how to get the language here?
            final String barberName = workWeekDayEntity.getBarber().getFirstName().get(LanguageEnum.en);
            final String title = barberName + " Not available";

            final Optional<WorkDayEntity> first = overrides.stream().filter(x -> x.getDay().isEqual(date) && x.getBarber().getId() == barberId).findFirst();

            if(first.isPresent()) {
                final WorkDayEntity workDayEntity = first.get();
                if(workDayEntity.isNotWorking()){
                    var result = new AppointmentModel();

                    result.id = -1L;
                    result.barberId = barberId;
                    result.start = date.atStartOfDay();
                    result.end = date.atTime(LocalTime.MAX);
                    result.title = title;
                    result.setNotWorking(true);
                    list.add(result);

                    continue;
                }

                var result = new AppointmentModel();

                result.id = -1L;
                result.barberId = barberId;
                result.start = date.atStartOfDay();
                result.end = date.atStartOfDay().with(workDayEntity.getFrom());
                result.title = title;


                list.add(result);
                var result2 = new AppointmentModel();

                result2.id = -1L;
                result2.barberId = barberId;
                result2.start = date.atStartOfDay().with(workDayEntity.getTo());
                result2.end = date.atTime(LocalTime.MAX);
                result2.title = title;

                list.add(result2);

                continue;
            }

            if(workWeekDayEntity.isNotWorking()){
                var result = new AppointmentModel();

                result.id = -1L;
                result.barberId = barberId;
                result.start = date.atStartOfDay();
                result.end = date.atTime(LocalTime.MAX);
                result.title = title;
                result.setNotWorking(true);

                list.add(result);

                continue;
            }

            var result = new AppointmentModel();

            result.id = -1L;
            result.barberId = barberId;
            result.start = date.atStartOfDay();
            result.end = date.atStartOfDay().with(workWeekDayEntity.getFrom());
            result.title = title;


            list.add(result);
            var result2 = new AppointmentModel();

            result2.id = -1L;
            result2.barberId = barberId;
            result2.start = date.atStartOfDay().with(workWeekDayEntity.getTo());
            result2.end = date.atTime(LocalTime.MAX);
            result2.title = title;

            list.add(result2);
        }

        return list;
    }
}
