package com.barbershop.cartel.clients.entity;

import com.barbershop.cartel.appointments.entity.AppointmentEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = ClientEntity.TABLE_NAME)
public class ClientEntity {

    public static final String TABLE_NAME = "clients";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "username")
    private String username;

    @Column(name = "phone_number")
    private String phoneNumber;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AppointmentEntity> schedule;
}