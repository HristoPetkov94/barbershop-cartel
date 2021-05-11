package com.barbershop.cartel.general.config.socialmedia.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class SocialMediaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String facebook;

    @Column
    private String instagram;
}
