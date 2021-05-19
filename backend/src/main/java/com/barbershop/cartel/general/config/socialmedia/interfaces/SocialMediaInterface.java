package com.barbershop.cartel.general.config.socialmedia.interfaces;

import com.barbershop.cartel.general.config.socialmedia.model.SocialMediaModel;

public interface SocialMediaInterface {
    SocialMediaModel getSocialMedia();

    void saveSocialMedia(SocialMediaModel socialMedia);
}
