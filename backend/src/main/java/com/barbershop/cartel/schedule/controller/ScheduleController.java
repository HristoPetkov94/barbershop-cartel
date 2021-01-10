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

    @PostMapping(value = "/appointment-previous-week")
    public AppointmentWeekModel getAppointmentsPreviousWeek(@RequestParam int numberOfWeeks, @RequestParam long barberId, @RequestParam long serviceId) {
        return scheduleInterface.getAppointmentsPreviousWeek(numberOfWeeks, barberId, serviceId);
    }

    @GetMapping(value = "/appointment-current-week")
    public AppointmentWeekModel getAppointmentsCurrentWeek(@RequestParam long barberId, @RequestParam long serviceId) {
        return scheduleInterface.getAppointmentsCurrentWeek(barberId, serviceId);
    }

    @PostMapping(value = "/appointment-next-week")
    public AppointmentWeekModel getAppointmentsNextWeek(@RequestParam int numberOfWeeks, @RequestParam long barberId, @RequestParam long serviceId) {
        return scheduleInterface.getAppointmentsNextWeek(numberOfWeeks, barberId, serviceId);
    }

    @PostMapping(value = "/save-appointment")
    public void saveAppointment(@RequestBody AppointmentRequestModel appointment) {
        scheduleInterface.save(appointment);
    }
}
