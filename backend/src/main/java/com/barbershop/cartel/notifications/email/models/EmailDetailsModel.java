package com.barbershop.cartel.notifications.email.models;

import com.barbershop.cartel.notifications.email.enums.EmailTypeEnum;
import com.barbershop.cartel.utils.InternationalString;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailDetailsModel {
    private long id;
    private String from;
    private InternationalString subject;
    private InternationalString text;
    private EmailTypeEnum emailType;
}
