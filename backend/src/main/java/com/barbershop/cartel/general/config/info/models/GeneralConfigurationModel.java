package com.barbershop.cartel.general.config.info.models;

import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GeneralConfigurationModel {
    private String appointmentSuccessMessage;

    private String city;
    private String address;
    private String phoneNumber;

    private LanguageEnum language;

    private String socialMediaFacebook;
    private String socialMediaInstagram;
}

