package com.barbershop.cartel.appointments.entity;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.services.entity.ServiceEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = AppointmentEntity.TABLE_NAME)
public class AppointmentEntity {

    public static final String TABLE_NAME = "appointments";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "startTime")
    private LocalDateTime startTime;

    @Column(name = "endTime")
    private LocalDateTime endTime;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "phone", unique = true)
    private String phone;

    @Column(name = "no_show")
    private boolean noShow;

    @ManyToOne(fetch = FetchType.LAZY)
    private BarberEntity barber;

    @ManyToOne(fetch = FetchType.LAZY)
    private ServiceEntity service;
}
