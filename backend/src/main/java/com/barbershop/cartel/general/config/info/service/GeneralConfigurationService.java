package com.barbershop.cartel.general.config.info.service;

import com.barbershop.cartel.errors.CartelCustomException;
import com.barbershop.cartel.general.config.info.entity.GeneralConfigurationEntity;
import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import com.barbershop.cartel.general.config.info.interfaces.GeneralConfigurationInterface;
import com.barbershop.cartel.general.config.info.models.GeneralConfigurationModel;
import com.barbershop.cartel.general.config.info.repository.GeneralConfigurationRepository;
import com.barbershop.cartel.general.config.socialmedia.interfaces.SocialMediaInterface;
import com.barbershop.cartel.general.config.socialmedia.repository.SocialMediaRepository;
import lombok.val;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GeneralConfigurationService implements GeneralConfigurationInterface {

    @Autowired
    private GeneralConfigurationRepository generalConfigurationRepository;

    @Autowired
    private SocialMediaRepository socialMediaRepository;

    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public GeneralConfigurationModel getConfiguration(LanguageEnum language) {

        GeneralConfigurationEntity configuration = generalConfigurationRepository.findByLanguage(language)
                .orElseThrow(() -> new CartelCustomException("No configuration was found"));

        return modelMapper.map(configuration, GeneralConfigurationModel.class);
    }

    @Override
    public void updateConfiguration(GeneralConfigurationModel config) {

        GeneralConfigurationEntity configuration = generalConfigurationRepository.findByLanguage(config.getLanguage())
                .orElseThrow(() -> new CartelCustomException("No configuration was found"));

        configuration.setAddress(config.getAddress());
        configuration.setAppointmentSuccessMessage(config.getAppointmentSuccessMessage());
        configuration.setCity(config.getCity());
        configuration.setFrontPageMessage(config.getFrontPageMessage());
        configuration.setLanguage(config.getLanguage());
        configuration.setPhoneNumber(config.getPhoneNumber());

        generalConfigurationRepository.save(configuration);

        val byId = socialMediaRepository.findById(configuration.getSocialMedia().getId());

        val socialMediaEntity = byId.get();

        socialMediaEntity.setFacebook(config.getSocialMediaFacebook());
        socialMediaEntity.setInstagram(config.getSocialMediaInstagram());

        socialMediaRepository.save(socialMediaEntity);
    }

}
