package com.barbershop.cartel.general.config.info.models;

import com.barbershop.cartel.utils.InternationalString;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GeneralConfigurationModel {
    private InternationalString appointmentSuccessMessage;

    private InternationalString city;
    private InternationalString address;
    private String phoneNumber;

    private String facebook;
    private String instagram;
}

