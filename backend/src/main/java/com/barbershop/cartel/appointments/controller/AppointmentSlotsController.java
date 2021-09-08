package com.barbershop.cartel.appointments.controller;

import com.barbershop.cartel.appointments.interfaces.AppointmentInterface;
import com.barbershop.cartel.appointments.models.AppointmentDayModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/appointment-day-models")
public class AppointmentSlotsController {

    @Autowired
    private AppointmentInterface appointmentInterface;

    @GetMapping
    public List<AppointmentDayModel> getAppointmentDayModels(@RequestParam long assignmentId,
                                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate from,
                                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate to) {

        return appointmentInterface.getAppointmentDayModels(assignmentId, from, to);
    }
}
