package com.barbershop.cartel.barbers.entity;

import com.barbershop.cartel.schedule.entity.ScheduleConfigEntity;
import com.barbershop.cartel.schedule.entity.ScheduleEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = BarberEntity.TABLE_NAME)
public class BarberEntity {

    public static final String TABLE_NAME = "barbers";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @OneToMany(mappedBy = "barber", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ScheduleEntity> schedule;

    @OneToMany(mappedBy = "barber", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ScheduleConfigEntity> scheduleConfig;

    @Column(name = "picture", columnDefinition = "TEXT")
    private String picture;

    @Column(name = "description")
    private String description;
}