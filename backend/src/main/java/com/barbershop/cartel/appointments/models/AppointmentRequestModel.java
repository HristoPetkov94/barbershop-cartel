package com.barbershop.cartel.appointments.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentRequestModel {
    private long assignmentId;
    private String date;
    private String hour;
    private String clientEmail;
    private String clientUsername;
}
