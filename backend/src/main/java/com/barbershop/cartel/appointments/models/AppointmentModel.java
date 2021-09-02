package com.barbershop.cartel.appointments.models;

import com.barbershop.cartel.utils.InternationalString;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AppointmentModel {

    private Long id;

    private LocalDateTime start;
    private LocalDateTime end;

    private Long barberId;
    private InternationalString barberName;

    private Long assignmentId;

    private String title;
    private Boolean noShow;

    private InternationalString serviceName;

    private String email;
    private String phone;
    private String name;
}
