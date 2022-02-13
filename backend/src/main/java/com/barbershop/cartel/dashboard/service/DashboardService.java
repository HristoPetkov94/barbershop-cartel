package com.barbershop.cartel.dashboard.service;

import com.barbershop.cartel.appointments.entity.AppointmentEntity;
import com.barbershop.cartel.appointments.repository.AppointmentRepository;
import com.barbershop.cartel.dashboard.interfaces.DashboardInterface;
import com.barbershop.cartel.dashboard.models.*;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.groupingBy;

@Service
public class DashboardService implements DashboardInterface {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public DashboardResponseModel generateReport(DashboardRequestModel requestModel) {

        List<BarberReportModel> barberReports = getReports(requestModel);

        DashboardResponseModel responseModel = new DashboardResponseModel();

        responseModel.setBarberReports(barberReports);

        return responseModel;
    }

    private List<BarberReportModel> getReports(DashboardRequestModel requestModel) {

        List<Long> barberIds = requestModel.getBarberIds();

        LocalDate start = requestModel.getStartDate();
        LocalDate end = requestModel.getEndDate();

        List<BarberReportModel> barberReports = new ArrayList<>();

        for (Long barberId : barberIds) {

            BarberReportModel reportByBarber = new BarberReportModel();

            reportByBarber.setBarberId(barberId);

            val dayReportModels = getDayReportModels(start, end, barberId);
            reportByBarber.setDays(dayReportModels);

            barberReports.add(reportByBarber);
        }

        return barberReports;
    }

    private List<DayReportModel> getDayReportModels(LocalDate startDate, LocalDate endDate, Long barberId) {

        List<DayReportModel> dayReportModels = new ArrayList<>();

        LocalDate date = startDate;

        while (date.isBefore(endDate) || date.isEqual(endDate)) {

            LocalDateTime startDateTime = date.atTime(LocalTime.MIN);
            LocalDateTime endDateTime = date.atTime(LocalTime.MAX);

            val appointments = appointmentRepository.findBetween(barberId, startDateTime, endDateTime)
                    .stream().map(appointment -> new AppointmentReportModel(appointment.getPrice()))
                    .collect(Collectors.toList());

            DayReportModel dayReportModel = new DayReportModel();

            dayReportModel.setDate(date);
            dayReportModel.setAppointments(appointments);

            dayReportModels.add(dayReportModel);

            date = date.plusDays(1L);
        }

        return dayReportModels;
    }
}
