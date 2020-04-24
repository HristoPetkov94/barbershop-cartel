package com.barbershop.cartel.schedule.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentRequestModel {
    private long barberId;
    private long serviceId;
    private String date;
    private String hour;
    private String clientEmail;
    private String clientUsername;
}
