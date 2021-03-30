package com.barbershop.cartel.appointments.entity;

import com.barbershop.cartel.clients.entity.ClientEntity;
import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.barbers.entity.BarberEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = AppointmentEntity.TABLE_NAME)
public class AppointmentEntity {

    public static final String TABLE_NAME = "appointments";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "hour")
    private LocalTime hour;

    @Column(name = "price")
    private int price;

    @Column(name = "duration")
    private int duration;

    @ManyToOne(fetch = FetchType.LAZY)
    private BarberEntity barber;

    @ManyToOne(fetch = FetchType.LAZY)
    private ServiceEntity service;

    @ManyToOne(fetch = FetchType.LAZY)
    private ClientEntity client;
}
