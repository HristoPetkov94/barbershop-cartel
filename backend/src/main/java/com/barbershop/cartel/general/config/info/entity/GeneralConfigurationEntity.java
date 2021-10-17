package com.barbershop.cartel.general.config.info.entity;

import com.barbershop.cartel.utils.InternationalString;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;

@Getter
@Setter
@Entity
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
@Table(name = GeneralConfigurationEntity.TABLE_NAME)
public class GeneralConfigurationEntity {

    public static final String TABLE_NAME = "general_configuration";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Type(type = "jsonb")
    @Column(name = "appointment_success_message", columnDefinition = "jsonb")
    private InternationalString appointmentSuccessMessage;

    @Type(type = "jsonb")
    @Column(name = "city", columnDefinition = "jsonb")
    private InternationalString city;

    @Type(type = "jsonb")
    @Column(name = "address", columnDefinition = "jsonb")
    private InternationalString address;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "instagram")
    private String instagram;
}
