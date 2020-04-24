package com.barbershop.cartel.schedule.controller;

import com.barbershop.cartel.schedule.models.AppointmentRequestModel;
import com.barbershop.cartel.schedule.models.AppointmentWeekModel;
import com.barbershop.cartel.schedule.interfaces.ScheduleInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    @Autowired
    private ScheduleInterface scheduleInterface;

    @GetMapping(value = "/appointment-current-week/{barberId}")
    public AppointmentWeekModel getAppointmentsForCurrentWeek(@PathVariable long barberId) {
        return scheduleInterface.getAppointmentCurrentWeek(barberId);
    }

    @PostMapping(value = "/appointment-next-week/{barberId}")
    public AppointmentWeekModel getAppointmentsForNextWeek(@RequestBody AppointmentWeekModel week, @PathVariable long barberId) {
        return scheduleInterface.getAppointmentNextWeek(week, barberId);
    }

    @PostMapping(value = "/appointment-previous-week/{barberId}")
    public AppointmentWeekModel getAppointmentsForPreviousWeek(@RequestBody AppointmentWeekModel week, @PathVariable long barberId) {
        return scheduleInterface.getAppointmentPreviousWeek(week, barberId);
    }

    @PostMapping(value = "/save-appointment")
    public void saveAppointment(@RequestBody AppointmentRequestModel appointment) {
        scheduleInterface.save(appointment);
    }
}
