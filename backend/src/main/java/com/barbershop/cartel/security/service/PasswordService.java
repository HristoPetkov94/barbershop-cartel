package com.barbershop.cartel.security.service;

import com.barbershop.cartel.notifications.email.interfaces.EmailInterface;
import com.barbershop.cartel.notifications.email.models.EmailDetailsModel;
import com.barbershop.cartel.security.entity.UserEntity;
import com.barbershop.cartel.security.models.UserModel;
import com.barbershop.cartel.security.models.PasswordValidationModel;
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

    private void changePassword(UserEntity user, String password) {

        user.setPassword(bcryptEncoder.encode(password));
        userRepository.save(user);

        log.info("New password for user:" + user.getEmail() + " has been applied.");
    }

    public void changePassword(UserModel userModel) {

        Optional<UserEntity> user = userRepository.findByEmail(userModel.getEmail());

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with email: " + userModel.getEmail() + " is not existing.");
        }

        changePassword(user.get(), userModel.getPassword());
    }

    /* ако трябва да добавя таблицата password_change_requests https://stackoverflow.com/questions/1102781/best-way-for-a-forgot-password-implementation*/
    public void forgotPassword(String email) {

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

    public void validatePassword(PasswordValidationModel validate) throws Exception {
        String email = validate.getEmail();
        String oldPassword = validate.getOldPassword();
        String newPassword = validate.getNewPassword();
        String confirmPassword = validate.getConfirmPassword();

        if (newPassword.isEmpty() || confirmPassword.isEmpty() || oldPassword.isEmpty()) {
            throw new Exception("Password fields cannot be empty");
        }

        UserEntity user = userRepository.findByEmail(email).orElseThrow(() ->
                    new UsernameNotFoundException("User with email: " + email + " is not existing."));

        boolean match = bcryptEncoder.matches(oldPassword, user.getPassword());

        if(!match) {
            throw new Exception("Old password does not match");
        }

        if (!newPassword.equals(confirmPassword)) {
            throw new Exception("New and Confirm passwords do not match");
        }
    }
}
