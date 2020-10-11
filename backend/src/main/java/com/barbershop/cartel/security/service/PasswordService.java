package com.barbershop.cartel.security.service;

import com.barbershop.cartel.notifications.email.interfaces.EmailInterface;
import com.barbershop.cartel.notifications.email.models.EmailDetailsModel;
import com.barbershop.cartel.security.entity.UserEntity;
import com.barbershop.cartel.security.repository.UserRepository;
import liquibase.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class PasswordService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailInterface emailInterface;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    /* ако трябва да добавя таблицата password_change_requests https://stackoverflow.com/questions/1102781/best-way-for-a-forgot-password-implementation*/
    public void forgotPassword(String email) {

        Optional<UserEntity> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User with email: " + email + " does not exist");
        }

        UserEntity user = userOptional.get();
        String password = StringUtils.randomIdentifer(15);

        changePassword(user, password);

        EmailDetailsModel details = emailDetails(password);
        emailInterface.sendMailMessage(details);
    }

    private EmailDetailsModel emailDetails(String password) {

        EmailDetailsModel emailDetailsModel = new EmailDetailsModel();

        emailDetailsModel.setFrom("noreply@barbershop-cartel.com");
        emailDetailsModel.setTo("petkovhristo94@gmail.com");
        emailDetailsModel.setSubject("Забравена парола");
        emailDetailsModel.setText("Здравей!\n\n Временната Ви парола е <b>" + password + "</b>. \n\nМоля сменете си я от тук: <a href=https://www.google.bg>www.google.bg</a> \n\nПоздрави!");

        return emailDetailsModel;
    }

    private void changePassword(UserEntity user, String password) {

        user.setPassword(bcryptEncoder.encode(password));
        userRepository.save(user);
        log.info("New password for user:" + user.getEmail() + " has been applied.");
    }
}
