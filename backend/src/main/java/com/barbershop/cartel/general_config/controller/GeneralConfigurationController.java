package com.barbershop.cartel.general_config.controller;

import com.barbershop.cartel.general_config.interfaces.GeneralConfigurationInterface;
import com.barbershop.cartel.general_config.models.ContactInfoModel;
import com.barbershop.cartel.general_config.models.SocialMediaModel;
import com.barbershop.cartel.notifications.email.entity.EmailDetailEntity;
import com.barbershop.cartel.notifications.email.models.EmailDetailsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/general-configuration")
public class GeneralConfigurationController {

    @Autowired
    private GeneralConfigurationInterface generalConfigurationInterface;

    /** GET **/
    @GetMapping("/front-page-message")
    public String getFrontPageMessage() {
        return generalConfigurationInterface.getFrontPageMessage();
    }

    @GetMapping("/appointment-message")
    public String getAppointmentMessage() {
        return generalConfigurationInterface.getAppointmentMessage();
    }

    @GetMapping("/social-media")
    public SocialMediaModel getSocialMedia() {
        return generalConfigurationInterface.getSocialMedia();
    }

    @GetMapping("/contact-info")
    public ContactInfoModel getContactInfo() {
        return generalConfigurationInterface.getContactInfo();
    }

    /** POST **/
    @PostMapping("/front-page-message")
    public void saveFrontPageMessage(@RequestParam String frontPageMessage) {
        generalConfigurationInterface.saveFrontPageMessage(frontPageMessage);
    }

    @PostMapping("/appointment-message")
    public void saveAppointmentMessage(@RequestParam String appointmentMessage) {
        generalConfigurationInterface.saveAppointmentMessage(appointmentMessage);
    }

    @PostMapping("/social-media")
    public void saveSocialMedia(@RequestBody SocialMediaModel socialMedia) {
        generalConfigurationInterface.saveSocialMedia(socialMedia);
    }

    @PostMapping("/contact-info")
    public void saveContactInfo(@RequestBody ContactInfoModel contactInfo) {
        generalConfigurationInterface.saveContactInfo(contactInfo);
    }
}
