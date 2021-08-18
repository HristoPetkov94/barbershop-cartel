package com.barbershop.cartel.barbers.models;

import com.barbershop.cartel.utils.InternationalString;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BarberModel {
    private Long id;
    private InternationalString firstName;
    private InternationalString lastName;
    private InternationalString description;
    private String picture;
    private String facebook;
    private String instagram;
}
