package com.barbershop.cartel.security.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PasswordValidationModel {

    private String email;
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;
}
