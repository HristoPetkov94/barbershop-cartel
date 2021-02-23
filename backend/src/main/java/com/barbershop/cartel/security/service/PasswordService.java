package com.barbershop.cartel.security.service;

import com.barbershop.cartel.notifications.email.interfaces.EmailInterface;
import com.barbershop.cartel.notifications.email.models.EmailDetailsModel;
import com.barbershop.cartel.security.entity.UserEntity;
import com.barbershop.cartel.security.repository.UserRepository;
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

    private EmailDetailsModel emailDetails(String password) {

        EmailDetailsModel emailDetailsModel = new EmailDetailsModel();

        emailDetailsModel.setFrom("noreply@barbershop-cartel.com");
        emailDetailsModel.setTo("petkovhristo94@gmail.com");
        emailDetailsModel.setSubject("Забравена парола");
        emailDetailsModel.setText("Здравей!\n\n Временната Ви парола е <b>" + password + "</b>. \n\nМоля сменете си я от тук: <a href=https://www.google.bg>www.google.bg</a> \n\nПоздрави!");

        return emailDetailsModel;
    }

    private String generateTemporaryPassword() {

        int passwordLength = 15;

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

        if(!match) {
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
    public void forgotPassword(String email) throws Exception {

        Optional<UserEntity> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User with email: " + email + " does not exist");
        }

        UserEntity user = userOptional.get();
        String password = generateTemporaryPassword();

        changePassword(user, password);

        EmailDetailsModel details = emailDetails(password);
        emailInterface.sendMailMessage(details);
    }

}
