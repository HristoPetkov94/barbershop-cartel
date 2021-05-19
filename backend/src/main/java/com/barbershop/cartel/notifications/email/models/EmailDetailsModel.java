package com.barbershop.cartel.notifications.email.models;

import com.barbershop.cartel.notifications.email.enums.EmailTypeEnum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailDetailsModel {
    private long id;
    private String from;
    private String subject;
    private String text;
    private EmailTypeEnum emailType;
}
