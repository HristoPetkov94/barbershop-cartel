package com.barbershop.cartel.schedule.controller;

import com.barbershop.cartel.schedule.models.AppointmentRequestModel;
import com.barbershop.cartel.schedule.models.AppointmentWeekModel;
import com.barbershop.cartel.schedule.interfaces.ScheduleInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;


@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    @Autowired
    private ScheduleInterface scheduleInterface;

    @PostMapping(value = "/appointment-previous-week/{barberId}")
    public AppointmentWeekModel getAppointmentsPreviousWeek(@RequestBody int numberOfWeeks, @PathVariable long barberId) {
        return scheduleInterface.getAppointmentsPreviousWeek(numberOfWeeks, barberId,0);
    }

    @GetMapping(value = "/appointment-current-week")
    public AppointmentWeekModel getAppointmentsCurrentWeek(@RequestParam long barberId, @RequestParam long serviceId) {
        return scheduleInterface.getAppointmentsCurrentWeek(barberId,serviceId);
    }

    @PostMapping(value = "/appointment-next-week/{barberId}")
    public AppointmentWeekModel getAppointmentsNextWeek(@RequestBody int numberOfWeeks, @PathVariable long barberId) {
        return scheduleInterface.getAppointmentsNextWeek(numberOfWeeks, barberId,0);
    }

    @PostMapping(value = "/save-appointment")
    public void saveAppointment(@RequestBody AppointmentRequestModel appointment) {
        scheduleInterface.save(appointment);
    }

    @GetMapping(value = "/preview")
    public AppointmentWeekModel getAppointmentsByBarberAndDates(@RequestParam long barberId, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
                                                                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return scheduleInterface.getAppointmentsByBarberAndDates(barberId, from, to);
    }
}
