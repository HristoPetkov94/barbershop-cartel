package com.barbershop.cartel.appointments.controller;

import com.barbershop.cartel.appointments.interfaces.AppointmentInterface;
import com.barbershop.cartel.appointments.models.AppointmentDayModel;
import com.barbershop.cartel.appointments.models.AppointmentModel;
import com.barbershop.cartel.clients.interfaces.ClientInterface;
import com.barbershop.cartel.errors.CartelCustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentInterface appointmentInterface;

    @Autowired
    private ClientInterface clientInterface;


    @GetMapping
    public List<AppointmentModel> all(@RequestParam long[] barberIds,
                                      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate from,
                                      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate to) {

        var appointments = appointmentInterface.getAppointments(barberIds, from.atStartOfDay(), to.atStartOfDay().plusDays(1));

        return appointments;
    }

    @PostMapping
    public void create(@RequestBody AppointmentModel appointmentModel, @RequestParam boolean allowOverlap) {

        if(clientInterface.isBanned(appointmentModel.getPhone())){
            throw new CartelCustomException("User phone is banned");
        }

        appointmentInterface.create(appointmentModel, allowOverlap);
    }

    @PutMapping
    public void update(@RequestBody AppointmentModel appointmentModel) {

        appointmentInterface.update(appointmentModel);
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable long id) {

        appointmentInterface.delete(id);
    }

    @GetMapping(value = "/appointment-week")
    public List<AppointmentDayModel> getAppointmentsNextWeek(@RequestParam int numberOfWeeksFromNow, @RequestParam long assignmentId) {
        return appointmentInterface.getAppointmentsNextWeek(assignmentId, numberOfWeeksFromNow);
    }
}
