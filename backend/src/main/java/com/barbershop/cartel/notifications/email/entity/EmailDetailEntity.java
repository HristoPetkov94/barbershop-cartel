package com.barbershop.cartel.notifications.email.entity;

import com.barbershop.cartel.notifications.email.enums.EmailTypeEnum;
import com.barbershop.cartel.utils.InternationalString;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

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

    @Type(type = "jsonb")
    @Column(name = "subject", columnDefinition = "jsonb")
    private InternationalString subject;

    @Type(type = "jsonb")
    @Column(name = "text", columnDefinition = "jsonb")
    private InternationalString text;

    @Column(name = "email_type")
    private EmailTypeEnum emailType;
}