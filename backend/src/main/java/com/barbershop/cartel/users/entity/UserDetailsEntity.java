package com.barbershop.cartel.users.entity;

import com.barbershop.cartel.schedule.entity.ScheduleConfigEntity;
import com.barbershop.cartel.security.entity.UserEntity;
import com.barbershop.cartel.schedule.entity.ScheduleEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = UserDetailsEntity.TABLE_NAME)
public class UserDetailsEntity {

    public static final String TABLE_NAME = "user_details";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id")
    private UserEntity user;

    @OneToMany(mappedBy = "barber", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ScheduleEntity> schedule;

    @OneToMany(mappedBy = "barber", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ScheduleConfigEntity> scheduleConfig;

    @Column(name = "picture", columnDefinition = "TEXT")
    private String picture;

    @Column(name = "description")
    private String description;
}