package com.barbershop.cartel.appointments.controller;

import com.barbershop.cartel.appointments.models.AppointmentModel;
import com.barbershop.cartel.appointments.models.AppointmentRequestModel;
import com.barbershop.cartel.appointments.models.AppointmentWeekModel;
import com.barbershop.cartel.appointments.interfaces.AppointmentInterface;
import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentInterface appointmentInterface;

    @GetMapping(value = "/appointment-previous-week")
    public AppointmentWeekModel getAppointmentsPreviousWeek(@RequestParam int numberOfWeeks, @RequestParam long assignmentId) {
        return appointmentInterface.getAppointmentsPreviousWeek(numberOfWeeks, assignmentId);
    }

    @GetMapping(value = "/appointment-current-week")
    public AppointmentWeekModel getAppointmentsCurrentWeek(@RequestParam long assignmentId) {
        return appointmentInterface.getAppointmentsCurrentWeek(assignmentId);
    }

    @GetMapping(value = "/appointment-next-week")
    public AppointmentWeekModel getAppointmentsNextWeek(@RequestParam int numberOfWeeks, @RequestParam long assignmentId) {
        return appointmentInterface.getAppointmentsNextWeek(numberOfWeeks, assignmentId);
    }

    @PostMapping(value = "/save-appointment")
    public void saveAppointment(@RequestBody AppointmentRequestModel appointmentModel, @RequestParam LanguageEnum language) throws MessagingException {
        appointmentInterface.save(appointmentModel, language);
    }

    @GetMapping
    public List<AppointmentModel> getAppointments(@RequestParam long[] barberIds,
                                                  @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate from,
                                                  @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate to) {

        return appointmentInterface.getAppointments(barberIds, from.atStartOfDay(), to.atStartOfDay().plusDays(1));
    }
}
