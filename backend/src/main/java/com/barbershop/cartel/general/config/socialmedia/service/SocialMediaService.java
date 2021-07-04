package com.barbershop.cartel.general.config.socialmedia.service;

import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import com.barbershop.cartel.general.config.info.service.GeneralConfigurationService;
import com.barbershop.cartel.general.config.socialmedia.interfaces.SocialMediaInterface;
import com.barbershop.cartel.general.config.socialmedia.model.SocialMediaModel;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SocialMediaService implements SocialMediaInterface {

    @Autowired
    private GeneralConfigurationService configurationService;

    @Override
    public SocialMediaModel getSocialMedia() {
        val configuration = configurationService.getConfiguration(LanguageEnum.en);

        val media = new SocialMediaModel();
        media.setFacebook(configuration.getSocialMediaFacebook());
        media.setInstagram(configuration.getSocialMediaInstagram());

        return media;
    }
}
