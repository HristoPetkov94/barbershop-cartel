package com.barbershop.cartel.services.entity;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.schedule.entity.ScheduleEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

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

    @Column(name = "price_BGN")
    private int price;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ScheduleEntity> schedule;

    @ManyToOne(fetch = FetchType.LAZY)
    private BarberEntity barber;

    @Column(name = "duration")
    private int duration;

    @Column(name = "picture", columnDefinition = "TEXT")
    private String picture;

    @Column(name = "description")
    private String description;
}
