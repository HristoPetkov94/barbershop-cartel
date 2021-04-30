package com.barbershop.cartel.general_config.service;

import com.barbershop.cartel.errors.CartelCustomException;
import com.barbershop.cartel.general_config.entity.GeneralConfigurationEntity;
import com.barbershop.cartel.general_config.interfaces.GeneralConfigurationInterface;
import com.barbershop.cartel.general_config.models.ContactInfoModel;
import com.barbershop.cartel.general_config.models.SocialMediaModel;
import com.barbershop.cartel.general_config.repository.GeneralConfigurationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class GeneralConfigurationService implements GeneralConfigurationInterface {

    @Autowired
    private GeneralConfigurationRepository generalConfigurationRepository;

    private static GeneralConfigurationEntity generalConfiguration;

    @PostConstruct
    private void initTable() {

        // Implemented this way because in the table only one entry is expected.
        GeneralConfigurationEntity generalConfiguration = new GeneralConfigurationEntity();
        generalConfigurationRepository.save(generalConfiguration);

        long ONLY_RECORD_ID = 1L;
        GeneralConfigurationService.generalConfiguration = generalConfigurationRepository.findById(ONLY_RECORD_ID)
                .orElseThrow(() -> new CartelCustomException("GeneralConfiguration is not existing. Not possible to get any data."));
    }

    @Override
    public void saveFrontPageMessage(String frontPageMessage) {

        generalConfiguration.setFrontPageMessage(frontPageMessage);

        generalConfigurationRepository.save(generalConfiguration);
    }

    @Override
    public String getFrontPageMessage() {
        return generalConfiguration.getFrontPageMessage();
    }

    @Override
    public void saveAppointmentMessage(String appointmentMessage) {

        generalConfiguration.setAppointmentSuccessMessage(appointmentMessage);

        generalConfigurationRepository.save(generalConfiguration);
    }

    @Override
    public String getAppointmentMessage() {
        return generalConfiguration.getAppointmentSuccessMessage();
    }

    @Override
    public void saveSocialMedia(SocialMediaModel socialMedia) {

        generalConfiguration.setFacebook(socialMedia.getFacebook());
        generalConfiguration.setInstagram(socialMedia.getInstagram());

        generalConfigurationRepository.save(generalConfiguration);
    }

    @Override
    public SocialMediaModel getSocialMedia() {

        SocialMediaModel socialMedia = new SocialMediaModel();

        socialMedia.setFacebook(generalConfiguration.getFacebook());
        socialMedia.setInstagram(generalConfiguration.getInstagram());

        return socialMedia;
    }

    @Override
    public void saveContactInfo(ContactInfoModel contactInfo) {

        generalConfiguration.setCity(contactInfo.getCity());
        generalConfiguration.setAddress(contactInfo.getAddress());
        generalConfiguration.setPhoneNumber(contactInfo.getPhoneNumber());

        generalConfigurationRepository.save(generalConfiguration);
    }

    @Override
    public ContactInfoModel getContactInfo() {

        ContactInfoModel contactInfo = new ContactInfoModel();

        contactInfo.setCity(generalConfiguration.getCity());
        contactInfo.setAddress(generalConfiguration.getAddress());
        contactInfo.setPhoneNumber(generalConfiguration.getPhoneNumber());

        return contactInfo;
    }

    public GeneralConfigurationEntity getGeneralConfigurationById(long generalConfigurationId) {
        return generalConfigurationRepository.findById(generalConfigurationId)
                .orElseThrow(() -> new CartelCustomException("GeneralConfiguration with id:" + generalConfigurationId + " is not existing."));
    }
}
