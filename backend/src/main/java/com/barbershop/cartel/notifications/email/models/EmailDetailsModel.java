package com.barbershop.cartel.notifications.email.models;

import lombok.Getter;

@Getter
public class EmailDetailsModel {
    private String from;
    private String to;
    private String subject;
    private String text;
}
