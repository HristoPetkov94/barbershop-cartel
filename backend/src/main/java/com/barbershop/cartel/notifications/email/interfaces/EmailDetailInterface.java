package com.barbershop.cartel.notifications.email.interfaces;

import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import com.barbershop.cartel.notifications.email.models.EmailDetailsModel;

import java.util.List;

public interface EmailDetailInterface {
    List<EmailDetailsModel> getBookingConfirmationMessage(LanguageEnum language);

    void saveBookingMessage(List<EmailDetailsModel> emailDetailsModel, LanguageEnum language);

    void sendBookingConfirmationMessage(String toRecipient,LanguageEnum language);

    void sendForgotPasswordMessage(String toRecipient, String password);
}
