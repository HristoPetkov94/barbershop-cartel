package com.barbershop.cartel.security.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserModel {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}
