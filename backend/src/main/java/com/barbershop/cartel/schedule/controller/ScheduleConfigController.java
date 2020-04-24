package com.barbershop.cartel.schedule.controller;

import com.barbershop.cartel.schedule.interfaces.ScheduleConfigInterface;
import com.barbershop.cartel.schedule.models.ScheduleConfigModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/schedule-config")
public class ScheduleConfigController {

    @Autowired
    private ScheduleConfigInterface scheduleConfigInterface;

    @PostMapping
    public void save(@RequestBody ScheduleConfigModel configuration) {
        scheduleConfigInterface.save(configuration);
    }

    @PatchMapping
    public void save(@RequestBody List<ScheduleConfigModel> configurations) {
        scheduleConfigInterface.save(configurations);
    }

    @GetMapping("/{barberId}")
    public List<ScheduleConfigModel> getConfigurationsByBarber(@PathVariable long barberId) {
        return scheduleConfigInterface.getConfigurationsByBarberId(barberId);
    }

    @GetMapping
    public ScheduleConfigModel getConfigurationByBarberAndDate(@RequestParam long barberId, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return scheduleConfigInterface.getConfigurationByBarberIdAndDate(barberId, date);
    }
}
