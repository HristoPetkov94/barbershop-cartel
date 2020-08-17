package com.barbershop.cartel.notifications.email.interfaces;

import com.barbershop.cartel.notifications.email.models.EmailDetailsModel;

public interface EmailInterface {
    void sendMailMessage(EmailDetailsModel emailDetails);
}
