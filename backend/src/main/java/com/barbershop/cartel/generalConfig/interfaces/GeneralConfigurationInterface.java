package com.barbershop.cartel.generalConfig.interfaces;

import com.barbershop.cartel.generalConfig.models.ContactInfoModel;
import com.barbershop.cartel.generalConfig.models.SocialMediaModel;

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
