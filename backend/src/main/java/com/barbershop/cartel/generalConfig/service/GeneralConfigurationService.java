package com.barbershop.cartel.generalConfig.service;

import com.barbershop.cartel.generalConfig.entity.GeneralConfigurationEntity;
import com.barbershop.cartel.generalConfig.interfaces.GeneralConfigurationInterface;
import com.barbershop.cartel.generalConfig.models.ContactInfoModel;
import com.barbershop.cartel.generalConfig.models.SocialMediaModel;
import com.barbershop.cartel.generalConfig.repository.GeneralConfigurationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Optional;

@Service
public class GeneralConfigurationService implements GeneralConfigurationInterface {

    @Autowired
    private GeneralConfigurationRepository generalConfigurationRepository;

    private static Optional<GeneralConfigurationEntity> configuration;

    @PostConstruct
    private void initTable() {

        // Implemented this way because in the table only one entry is expected.
        GeneralConfigurationEntity generalConfiguration = new GeneralConfigurationEntity();
        generalConfigurationRepository.save(generalConfiguration);

        long ONLY_RECORD_ID = 1L;
        configuration = generalConfigurationRepository.findById(ONLY_RECORD_ID);
    }

    @Override
    public void saveFrontPageMessage(String frontPageMessage) {

        if (configuration.isEmpty()) {
            throw new NullPointerException("GeneralConfiguration is not existing. Not possible to save new front page message");
        }

        configuration.get().setFrontPageMessage(frontPageMessage);

        generalConfigurationRepository.save(configuration.get());
    }

    @Override
    public String getFrontPageMessage() {

        if (configuration.isEmpty()) {
            throw new NullPointerException("GeneralConfiguration is not existing. Not possible to get front page message");
        }

        return configuration.get().getFrontPageMessage();
    }

    @Override
    public void saveAppointmentMessage(String appointmentMessage) {

        if (configuration.isEmpty()) {
            throw new NullPointerException("GeneralConfiguration is not existing. Not possible to save new appointment success message");
        }

        configuration.get().setAppointmentSuccessMessage(appointmentMessage);

        generalConfigurationRepository.save(configuration.get());
    }

    @Override
    public String getAppointmentMessage() {

        if (configuration.isEmpty()) {
            throw new NullPointerException("GeneralConfiguration is not existing. Not possible to get appointment success message");
        }

        return configuration.get().getAppointmentSuccessMessage();
    }

    @Override
    public void saveSocialMedia(SocialMediaModel socialMedia) {

        if (configuration.isEmpty()) {
            throw new NullPointerException("GeneralConfiguration is not existing. Not possible to save new social media");
        }

        configuration.get().setFacebook(socialMedia.getFacebook());
        configuration.get().setInstagram(socialMedia.getInstagram());

        generalConfigurationRepository.save(configuration.get());
    }

    @Override
    public SocialMediaModel getSocialMedia() {

        if (configuration.isEmpty()) {
            throw new NullPointerException("GeneralConfiguration is not existing. Not possible to get social media");
        }

        SocialMediaModel socialMedia = new SocialMediaModel();

        socialMedia.setFacebook(configuration.get().getFacebook());
        socialMedia.setInstagram(configuration.get().getInstagram());

        return socialMedia;
    }

    @Override
    public void saveContactInfo(ContactInfoModel contactInfo) {

        if (configuration.isEmpty()) {
            throw new NullPointerException("GeneralConfiguration is not existing. Not possible to save new contact info");
        }

        configuration.get().setCity(contactInfo.getCity());
        configuration.get().setAddress(contactInfo.getAddress());
        configuration.get().setPhoneNumber(contactInfo.getPhoneNumber());

        generalConfigurationRepository.save(configuration.get());
    }

    @Override
    public ContactInfoModel getContactInfo() {

        if (configuration.isEmpty()) {
            throw new NullPointerException("GeneralConfiguration is not existing. Not possible to save new contact info");
        }

        ContactInfoModel contactInfo = new ContactInfoModel();

        contactInfo.setCity(configuration.get().getCity());
        contactInfo.setAddress(configuration.get().getAddress());
        contactInfo.setPhoneNumber(configuration.get().getPhoneNumber());

        return contactInfo;
    }
}
