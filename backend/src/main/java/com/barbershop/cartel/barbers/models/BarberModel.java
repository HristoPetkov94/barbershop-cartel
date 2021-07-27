package com.barbershop.cartel.barbers.models;

import com.barbershop.cartel.utils.InternationalLanguage;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BarberModel {
    private Long id;
    private InternationalLanguage firstName;
    private InternationalLanguage lastName;
    private InternationalLanguage description;
    private String picture;
    private String facebook;
    private String instagram;
}
