package com.barbershop.cartel.appointments.models;

import com.barbershop.cartel.assignments.models.AssignmentModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentRequestModel {
    private AssignmentModel assignment;
    private String date;
    private String hour;
    private String clientEmail;
    private String clientUsername;
}
