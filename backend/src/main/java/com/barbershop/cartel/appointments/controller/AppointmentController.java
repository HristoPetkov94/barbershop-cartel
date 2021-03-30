package com.barbershop.cartel.appointments.controller;

import com.barbershop.cartel.appointments.models.AppointmentRequestModel;
import com.barbershop.cartel.appointments.models.AppointmentWeekModel;
import com.barbershop.cartel.appointments.interfaces.AppointmentInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentInterface appointmentInterface;

    @PostMapping(value = "/appointment-previous-week")
    public AppointmentWeekModel getAppointmentsPreviousWeek(@RequestParam int numberOfWeeks, @RequestParam long barberId, @RequestParam long serviceId) {
        return appointmentInterface.getAppointmentsPreviousWeek(numberOfWeeks, barberId, serviceId);
    }

    @GetMapping(value = "/appointment-current-week")
    public AppointmentWeekModel getAppointmentsCurrentWeek(@RequestParam long barberId, @RequestParam long serviceId) {
        return appointmentInterface.getAppointmentsCurrentWeek(barberId, serviceId);
    }

    @PostMapping(value = "/appointment-next-week")
    public AppointmentWeekModel getAppointmentsNextWeek(@RequestParam int numberOfWeeks, @RequestParam long barberId, @RequestParam long serviceId) {
        return appointmentInterface.getAppointmentsNextWeek(numberOfWeeks, barberId, serviceId);
    }

    @PostMapping(value = "/save-appointment")
    public void saveAppointment(@RequestBody AppointmentRequestModel appointment) {
        appointmentInterface.save(appointment);
    }
}
