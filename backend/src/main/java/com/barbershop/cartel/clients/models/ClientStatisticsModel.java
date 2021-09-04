package com.barbershop.cartel.clients.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class ClientStatisticsModel {

    @Id
    private long id;

    private String email;
    private String name;
    private String phone;

    private long allAppointmentsCount;
    private long missedAppointmentsCount;

    private boolean banned;

}
