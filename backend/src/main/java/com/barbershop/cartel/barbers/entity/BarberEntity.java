package com.barbershop.cartel.barbers.entity;

import com.barbershop.cartel.appointments.entity.AppointmentEntity;
import com.barbershop.cartel.appointments.service.AppointmentService;
import com.barbershop.cartel.assignments.entity.AssignmentEntity;
import com.barbershop.cartel.general.config.info.entity.SocialMediaEntity;
import com.barbershop.cartel.work.day.WorkDayEntity;
import com.barbershop.cartel.work.weekday.WorkWeekDayEntity;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

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

    @Column(name = "picture", columnDefinition = "TEXT")
    private String picture;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(name = "social_media_id", referencedColumnName = "id")
    private SocialMediaEntity socialMedia = new SocialMediaEntity();

    @OneToMany(mappedBy = "barber", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AssignmentEntity> assignments;

    @OneToMany(mappedBy = "barber", cascade = CascadeType.ALL, orphanRemoval = true)
    @LazyCollection(LazyCollectionOption.TRUE)
    private List<WorkDayEntity> workDays;

    @OneToMany(mappedBy = "barber", cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.TRUE)
    private List<WorkWeekDayEntity> workWeekDays;

    @OneToMany(mappedBy = "barber", cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.TRUE)
    private List<AppointmentEntity> appointments;
}
