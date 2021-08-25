package com.barbershop.cartel.appointments.models;

import com.barbershop.cartel.utils.InternationalString;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AppointmentModel {

    public Long id;

    public LocalDateTime start;
    public LocalDateTime end;

    public Long barberId;
    public InternationalString barberName;

    private Long assignmentId;

    public String title;

    public InternationalString serviceName;

    private String email;
    private String phone;
    private String name;
}
