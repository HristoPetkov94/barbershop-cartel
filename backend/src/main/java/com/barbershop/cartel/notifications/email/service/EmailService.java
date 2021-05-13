package com.barbershop.cartel.notifications.email.service;

import com.barbershop.cartel.errors.CartelCustomException;
import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import com.barbershop.cartel.notifications.email.entity.EmailDetailEntity;
import com.barbershop.cartel.notifications.email.enums.EmailTypeEnum;
import com.barbershop.cartel.notifications.email.interfaces.EmailDetailInterface;
import com.barbershop.cartel.notifications.email.models.EmailDetailsModel;
import com.barbershop.cartel.notifications.email.repository.EmailDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class EmailService implements EmailDetailInterface {

    @Autowired
    private JavaMailSenderImpl mailSender;

    @Autowired
    private EmailDetailRepository emailDetailRepository;

    @Override
    public void sendBookingConfirmationMessage(String toRecipient, LanguageEnum language) {

        EmailDetailEntity emailDetails = emailDetailRepository.findByEmailTypeAndLanguage(EmailTypeEnum.BOOKING_EMAIL_TYPE, language)
                .orElseThrow(() -> new CartelCustomException("Email notification type: BOOKING_EMAIL_TYPE is not existing."));

        sendMessage(emailDetails, toRecipient);
    }

    @Override
    public void sendForgotPasswordMessage(String toRecipient, String password) {

        EmailDetailEntity emailDetails = emailDetailRepository.findByEmailType(EmailTypeEnum.FORGOT_PASSWORD_TYPE)
                .orElseThrow(() -> new CartelCustomException("Email notification type: FORGOT_PASSWORD_TYPE is not existing."));

        String text = replaceVariable(emailDetails.getText(), password);

        emailDetails.setText(text);

        sendMessage(emailDetails, toRecipient);
    }

    @Override
    public void saveBookingMessage(List<EmailDetailsModel> emailDetailsModel, LanguageEnum language) {

        if (emailDetailsModel.isEmpty()) {
            throw new CartelCustomException("No email messages found.");
        }

        for (EmailDetailsModel details : emailDetailsModel) {

            EmailDetailEntity emailDetails = emailDetailRepository.findByEmailTypeAndLanguage(details.getEmailType(), language)
                    .orElse(new EmailDetailEntity());

            emailDetails.setSubject(details.getSubject());
            emailDetails.setText(details.getText());
            emailDetails.setEmailType(details.getEmailType());

            emailDetailRepository.save(emailDetails);
        }
    }

    @Override
    public List<EmailDetailsModel> getBookingConfirmationMessage(LanguageEnum language) {

        Iterable<EmailDetailEntity> emailDetails = emailDetailRepository.findAllByLanguage(language);

        List<EmailDetailsModel> emailDetailsModels = new ArrayList<>();

        for (EmailDetailEntity emailDetail : emailDetails) {

            EmailDetailsModel emailDetailsModel = new EmailDetailsModel();

            emailDetailsModel.setId(emailDetail.getId());
            emailDetailsModel.setFrom(emailDetail.getFrom());
            emailDetailsModel.setSubject(emailDetail.getSubject());
            emailDetailsModel.setText(emailDetail.getText());
            emailDetailsModel.setEmailType(emailDetail.getEmailType());

            emailDetailsModels.add(emailDetailsModel);
        }

        return emailDetailsModels;
    }

    private synchronized void sendMessage(EmailDetailEntity emailDetails, String toRecipient) {

        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setFrom(emailDetails.getFrom());
        mailMessage.setTo("petkovhristo94@gmail.com");
        mailMessage.setSubject(emailDetails.getSubject());
        mailMessage.setText(emailDetails.getText());

        try {
            mailSender.send(mailMessage);
        } catch (MailException e) {
            System.err.println(e.getMessage());
        }
    }

    private String replaceVariable(String text, String variable) {

        String placeHolder = "$password";

        return text.replace(placeHolder, variable);
    }
}
