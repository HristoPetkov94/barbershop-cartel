package com.barbershop.cartel.dashboard.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DayReportModel {

    private LocalDate date;
    private List<AppointmentReportModel> appointments;
}
