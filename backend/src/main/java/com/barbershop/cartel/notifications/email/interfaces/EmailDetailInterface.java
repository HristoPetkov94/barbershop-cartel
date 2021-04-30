package com.barbershop.cartel.notifications.email.interfaces;

import com.barbershop.cartel.notifications.email.models.EmailDetailsModel;

import java.util.List;

public interface EmailDetailInterface {
    List<EmailDetailsModel> getBookingConfirmationMessage();

    void saveBookingMessage(List<EmailDetailsModel> emailDetailsModel);

    void sendBookingConfirmationMessage(String toRecipient);

    void sendForgotPasswordMessage(String toRecipient, String password);
}
