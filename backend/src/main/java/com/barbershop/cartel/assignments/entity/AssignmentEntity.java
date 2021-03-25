package com.barbershop.cartel.assignments.entity;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.services.entity.ServiceEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Table(name = AssignmentEntity.TABLE_NAME)
@Entity
public class AssignmentEntity {

    public static final String TABLE_NAME = "assignments";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "price")
    private int price;

    @Column(name = "duration")
    private int duration;

    @ManyToOne
    @JoinColumn(name = "barber_id")
    private BarberEntity barber;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private ServiceEntity service;
}


