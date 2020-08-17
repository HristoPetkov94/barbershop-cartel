package com.barbershop.cartel.notifications.email.service;

import com.barbershop.cartel.notifications.email.interfaces.EmailInterface;
import com.barbershop.cartel.notifications.email.models.EmailDetailsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements EmailInterface {

    @Autowired
    private JavaMailSenderImpl mailSender;

    @Override
    public void sendMailMessage(EmailDetailsModel emailDetails) {

        // Create an email instance
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setFrom(emailDetails.getFrom());
        mailMessage.setTo(emailDetails.getTo());
        mailMessage.setSubject(emailDetails.getSubject());
        mailMessage.setText(emailDetails.getText());

        mailSender.send(mailMessage);
    }
}
