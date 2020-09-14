package com.barbershop.cartel.notifications.email.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailDetailsModel {
    private String from;
    private String to;
    private String subject;
    private String text;
}
