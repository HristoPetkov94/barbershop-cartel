package com.barbershop.cartel.users.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserDetailsModel {
    private Long id;
    private String firstName;
    private String lastName;
    private String description;
    private String picture;
}
