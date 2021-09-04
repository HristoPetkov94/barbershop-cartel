package com.barbershop.cartel.clients.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = ClientEntity.TABLE_NAME)
public class ClientEntity {

    public static final String TABLE_NAME = "clients";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "phone", unique = true)
    private String phone;

    @Column(name = "banned")
    private boolean banned;
}
