package com.barbershop.cartel.notifications.email.controller;


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

    @GetMapping("/booking-confirmation-message")
    public List<EmailDetailsModel> getBookingConfirmationMessage() {
        return emailDetailInterface.getBookingConfirmationMessage();
    }

    @PostMapping("/booking-confirmation-message")
    public void saveBookingConfirmationMessage(@RequestBody List<EmailDetailsModel> emailDetails) {
        emailDetailInterface.saveBookingMessage(emailDetails);
    }
}
