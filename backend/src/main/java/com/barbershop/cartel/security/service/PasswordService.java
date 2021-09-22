package com.barbershop.cartel.security.service;

import com.barbershop.cartel.errors.CartelCustomException;
import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import com.barbershop.cartel.notifications.email.interfaces.EmailDetailInterface;
import com.barbershop.cartel.security.entity.UserEntity;
import com.barbershop.cartel.security.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

@Slf4j
@Service
public class PasswordService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailDetailInterface emailDetailInterface;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    private String generateTemporaryPassword() {

        int passwordLength = 10;

        // chose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";

        StringBuilder password = new StringBuilder(passwordLength);

        for (int i = 0; i < passwordLength; i++) {

            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index = (int) (AlphaNumericString.length() * Math.random());

            // add Character one by one in end of password
            password.append(AlphaNumericString.charAt(index));
        }

        return password.toString();
    }

    public void changePassword(String email, String oldPassword, String newPassword) {

        UserEntity user = userRepository.findByEmail(email).orElseThrow(() ->
                new CartelCustomException("User with email: " + email + " is not existing."));

        if (oldPassword.isEmpty()) {
            throw new CartelCustomException("Password fields cannot be empty");
        }

        boolean match = bcryptEncoder.matches(oldPassword, user.getPassword());

        if (!match) {
            throw new CartelCustomException("Old password doesn't match");
        }

        changePassword(user, newPassword);
    }

    public void changePassword(UserEntity user, String newPassword) {

        user.setPassword(bcryptEncoder.encode(newPassword));

        userRepository.save(user);

        log.info("New password for user:" + user.getEmail() + " has been applied.");
    }

    /* ако трябва да добавя таблицата password_change_requests https://stackoverflow.com/questions/1102781/best-way-for-a-forgot-password-implementation*/
    public void forgotPassword(String email, LanguageEnum language) throws MessagingException {

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CartelCustomException("User with email: " + email + " does not exist"));

        String username = user.getEmail();
        String password = generateTemporaryPassword();

        changePassword(user, password);

        emailDetailInterface.sendForgotPasswordMessage(username, password, language);
    }

}
