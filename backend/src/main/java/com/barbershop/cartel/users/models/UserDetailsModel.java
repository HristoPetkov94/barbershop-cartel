package com.barbershop.cartel.users.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserDetailsModel {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String description;
    private String picture;
}
