package com.barbershop.cartel.barbers.entity;

import com.barbershop.cartel.appointments.entity.AppointmentEntity;
import com.barbershop.cartel.assignments.entity.AssignmentEntity;
import com.barbershop.cartel.utils.InternationalString;
import com.barbershop.cartel.work.day.WorkDayEntity;
import com.barbershop.cartel.work.weekday.WorkWeekDayEntity;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
@Table(name = BarberEntity.TABLE_NAME)
public class BarberEntity {

    public static final String TABLE_NAME = "barbers";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Type(type = "jsonb")
    @Column(name = "first_name", columnDefinition = "jsonb")
    private InternationalString firstName;

    @Type(type = "jsonb")
    @Column(name = "last_name", columnDefinition = "jsonb")
    private InternationalString lastName;

    @Type(type = "jsonb")
    @Column(name = "description", columnDefinition = "jsonb")
    private InternationalString description;

    @Column(name = "picture", columnDefinition = "TEXT")
    private String picture;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "instagram")
    private String instagram;

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
