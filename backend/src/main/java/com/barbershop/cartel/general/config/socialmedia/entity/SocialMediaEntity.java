package com.barbershop.cartel.general.config.socialmedia.entity;

import com.barbershop.cartel.general.config.info.entity.GeneralConfigurationEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = SocialMediaEntity.TABLE_NAME)
public class SocialMediaEntity {

    public static final String TABLE_NAME = "social_media";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String facebook;

    @Column
    private String instagram;
}
