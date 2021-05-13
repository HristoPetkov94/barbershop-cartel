package com.barbershop.cartel.notifications.email.entity;

import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import com.barbershop.cartel.notifications.email.enums.EmailTypeEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = EmailDetailEntity.TABLE_NAME)
public class EmailDetailEntity {

    public static final String TABLE_NAME = "email_details";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "email_from")
    private String from;

    @Column(name = "subject")
    private String subject;

    @Column(name = "text")
    private String text;

    @Column(name = "email_type")
    private EmailTypeEnum emailType;

    @Column(name = "language")
    private LanguageEnum language;
}