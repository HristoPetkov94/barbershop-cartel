package com.barbershop.cartel.services.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = ServiceEntity.TABLE_NAME)
public class ServiceEntity {

    public static final String TABLE_NAME = "services";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "service_type")
    private String serviceType;

    @Column(name = "price")
    private int price;

    @Column(name = "duration")
    private int duration;

    @Column(name = "picture", columnDefinition = "TEXT")
    private String picture;

    @Column(name = "description")
    private String description;
}
