package com.barbershop.cartel.notifications.email.service;

import com.barbershop.cartel.errors.CartelCustomException;
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

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;


@Service
public class EmailService implements EmailDetailInterface {

    @Autowired
    private JavaMailSenderImpl mailSender;

    @Autowired
    private EmailDetailRepository emailDetailRepository;

    // This is going to be replaced by changeset, currently is here because if test purposes.
    @PostConstruct
    private void initTable() {

        EmailDetailEntity bookingEmail = new EmailDetailEntity();

        bookingEmail.setFrom("admin@cartel.bg");
        bookingEmail.setSubject("Cartel Резервация");
        bookingEmail.setText("Вие успешно направихте резервация. И тн..");
        bookingEmail.setEmailType(EmailTypeEnum.BOOKING_EMAIL_TYPE);

        emailDetailRepository.save(bookingEmail);

        EmailDetailEntity forgotPasswordEmail = new EmailDetailEntity();

        forgotPasswordEmail.setFrom("admin@cartel.bg");
        forgotPasswordEmail.setSubject("Забравена парола");
        forgotPasswordEmail.setText("Вашата парола е $password");
        forgotPasswordEmail.setEmailType(EmailTypeEnum.FORGOT_PASSWORD_TYPE);

        emailDetailRepository.save(forgotPasswordEmail);
    }

    @Override
    public void sendBookingConfirmationMessage(String toRecipient) {

        EmailDetailEntity emailDetails = emailDetailRepository.findByEmailType(EmailTypeEnum.BOOKING_EMAIL_TYPE)
                .orElseThrow(() -> new CartelCustomException("Email notification type: BOOKING_EMAIL_TYPE is not existing."));

        sendMessage(emailDetails, toRecipient);
    }

    @Override
    public void sendForgotPasswordMessage(String password, String toRecipient) {

        EmailDetailEntity emailDetails = emailDetailRepository.findByEmailType(EmailTypeEnum.FORGOT_PASSWORD_TYPE)
                .orElseThrow(() -> new CartelCustomException("Email notification type: FORGOT_PASSWORD_TYPE is not existing."));

        emailDetails.setText(emailDetails.getText() + " " + password);

        sendMessage(emailDetails, toRecipient);
    }

    @Override
    public void saveBookingMessage(List<EmailDetailsModel> emailDetailsModel) {

        if (emailDetailsModel.isEmpty()) {
            throw new CartelCustomException("No email messages found.");
        }

        for (EmailDetailsModel details : emailDetailsModel) {

            EmailDetailEntity emailDetails = emailDetailRepository.findByEmailType(details.getEmailType())
                    .orElse(new EmailDetailEntity());

            emailDetails.setSubject(details.getSubject());
            emailDetails.setText(details.getText());
            emailDetails.setEmailType(details.getEmailType());

            emailDetailRepository.save(emailDetails);
        }
    }

    @Override
    public List<EmailDetailsModel> getBookingConfirmationMessage() {

        Iterable<EmailDetailEntity> emailDetails = emailDetailRepository.findAll();

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
        //mailMessage.setTo(toRecipient);
        mailMessage.setSubject(emailDetails.getSubject());
        mailMessage.setText(emailDetails.getText());

        try {
            mailSender.send(mailMessage);
        } catch (MailException e) {
            System.err.println(e.getMessage());
        }
    }
}
