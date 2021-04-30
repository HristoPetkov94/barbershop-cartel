package com.barbershop.cartel.general_config.interfaces;

import com.barbershop.cartel.general_config.models.ContactInfoModel;
import com.barbershop.cartel.general_config.models.SocialMediaModel;

public interface GeneralConfigurationInterface {
    void saveFrontPageMessage(String frontPageMessage);

    String getFrontPageMessage();

    void saveAppointmentMessage(String appointmentMessage);

    String getAppointmentMessage();

    void saveSocialMedia(SocialMediaModel socialMedia);

    SocialMediaModel getSocialMedia();

    void saveContactInfo(ContactInfoModel contactInfo);

    ContactInfoModel getContactInfo();
}
