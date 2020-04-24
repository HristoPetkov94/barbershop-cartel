package com.barbershop.cartel.generalInfo.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = GeneralInfoEntity.TABLE_NAME)
public class GeneralInfoEntity {

    public static final String TABLE_NAME = "general_info";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "message")
    private String message;

    @Column(name = "instagram_profile")
    private String instagramProfile;

    @Column(name = "facebook_profile")
    private String facebookProfile;
}
