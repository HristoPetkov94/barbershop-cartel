package com.barbershop.cartel.notifications.email.service;

import com.barbershop.cartel.errors.CartelCustomException;
import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import com.barbershop.cartel.notifications.email.entity.EmailDetailEntity;
import com.barbershop.cartel.notifications.email.enums.EmailTypeEnum;
import com.barbershop.cartel.notifications.email.interfaces.EmailDetailInterface;
import com.barbershop.cartel.notifications.email.models.EmailDetailsModel;
import com.barbershop.cartel.notifications.email.repository.EmailDetailRepository;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import com.barbershop.cartel.utils.InternationalString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
@Slf4j
public class EmailService implements EmailDetailInterface {

    @Autowired
    private JavaMailSenderImpl mailSender;

    @Autowired
    private EmailDetailRepository emailDetailRepository;

    @Override
    public void sendBookingConfirmationMessage(String toRecipient, LanguageEnum language) throws MessagingException {

        EmailDetailEntity emailDetails = emailDetailRepository.findByEmailType(EmailTypeEnum.BOOKING_EMAIL_TYPE)
                .orElseThrow(() -> new CartelCustomException("Email notification type: BOOKING_EMAIL_TYPE is not existing."));

        sendMessage(emailDetails, toRecipient, language);
    }

    @Override
    public void sendForgotPasswordMessage(String toRecipient, String password, LanguageEnum language) throws MessagingException {

        EmailDetailEntity emailDetails = emailDetailRepository.findByEmailType(EmailTypeEnum.FORGOT_PASSWORD_TYPE)
                .orElseThrow(() -> new CartelCustomException("Email notification type: FORGOT_PASSWORD_TYPE is not existing."));

        InternationalString text = replaceVariable(emailDetails.getText(), password, language);

        emailDetails.setText(text);

        sendMessage(emailDetails, toRecipient, language);
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

    private synchronized void sendMessage(EmailDetailEntity emailDetails, String toRecipient, LanguageEnum language) throws MessagingException {

        MimeMessage mimeMessage = mailSender.createMimeMessage();

        final val parse = InternetAddress.parse(toRecipient);
        log.info("Sending email from {} to {}", emailDetails.getFrom(), toRecipient);

        mimeMessage.setFrom(emailDetails.getFrom());
        mimeMessage.setRecipients(Message.RecipientType.TO, parse);
        mimeMessage.setSubject(emailDetails.getSubject().get(language), "UTF-8");
        mimeMessage.setText(emailDetails.getText().get(language), "UTF-8", "html");
        mimeMessage.setSentDate(new Date());

        try {
            mailSender.send(mimeMessage);
        } catch (MailException e) {
            log.info(e.toString());
            System.err.println(e.getMessage());
        }
    }

    private InternationalString replaceVariable(InternationalString text, String password, LanguageEnum language) {

        String placeHolder = "$password";

        String replacement = text.get(language).replace(placeHolder, password);

        text.put(language, replacement);

        return text;
    }
}
