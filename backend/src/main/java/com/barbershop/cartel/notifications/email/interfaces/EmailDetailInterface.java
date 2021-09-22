package com.barbershop.cartel.notifications.email.interfaces;

import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import com.barbershop.cartel.notifications.email.models.EmailDetailsModel;

import javax.mail.MessagingException;
import java.util.List;

public interface EmailDetailInterface {
    List<EmailDetailsModel> getBookingConfirmationMessage();

    void saveBookingMessage(List<EmailDetailsModel> emailDetailsModel);

    void sendBookingConfirmationMessage(String toRecipient,LanguageEnum language) throws MessagingException;

    void sendForgotPasswordMessage(String toRecipient, String password, LanguageEnum language) throws MessagingException;
}
