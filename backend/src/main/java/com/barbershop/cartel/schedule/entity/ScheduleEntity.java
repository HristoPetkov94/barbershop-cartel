package com.barbershop.cartel.schedule.entity;

import com.barbershop.cartel.clients.entity.ClientEntity;
import com.barbershop.cartel.security.entity.UserEntity;
import com.barbershop.cartel.services.entity.ServiceEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

//TODO: check if there's a need to add JsonIgnores on the mappings.

@Getter
@Setter
@Entity
@Table(name = ScheduleEntity.TABLE_NAME)
public class ScheduleEntity {

    public static final String TABLE_NAME = "schedule";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "hour", unique = true)
    private LocalTime hour;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserEntity barber;

    @ManyToOne(fetch = FetchType.LAZY)
    private ServiceEntity service;

    @ManyToOne(fetch = FetchType.LAZY)
    private ClientEntity client;
}
