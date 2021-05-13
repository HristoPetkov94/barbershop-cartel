package com.barbershop.cartel.notifications.email.controller;


import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import com.barbershop.cartel.notifications.email.interfaces.EmailDetailInterface;
import com.barbershop.cartel.notifications.email.models.EmailDetailsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/email-notification")
public class EmailNotificationController {

    @Autowired
    private EmailDetailInterface emailDetailInterface;

    @GetMapping
    public List<EmailDetailsModel> getBookingConfirmationMessage(@RequestParam LanguageEnum language) {
        return emailDetailInterface.getBookingConfirmationMessage(language);
    }

    @PostMapping
    public void saveBookingConfirmationMessage(@RequestBody List<EmailDetailsModel> emailDetails, @RequestParam LanguageEnum language) {
        emailDetailInterface.saveBookingMessage(emailDetails, language);
    }
}
