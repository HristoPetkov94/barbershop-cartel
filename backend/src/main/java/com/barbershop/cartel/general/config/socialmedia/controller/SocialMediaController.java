package com.barbershop.cartel.general.config.socialmedia.controller;

import com.barbershop.cartel.general.config.socialmedia.interfaces.SocialMediaInterface;
import com.barbershop.cartel.general.config.socialmedia.model.SocialMediaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/social-media")
public class SocialMediaController {

    @Autowired
    private SocialMediaInterface socialMediaInterface;

    @GetMapping
    private SocialMediaModel getSocialMedia() {
        return socialMediaInterface.getSocialMedia();
    }

    @PostMapping
    private void updateSocialMedia(@RequestBody SocialMediaModel socialMedia) {
        this.socialMediaInterface.saveSocialMedia(socialMedia);
    }
}
