package com.barbershop.cartel.barbers.models;

import com.barbershop.cartel.services.entity.ServiceEntity;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BarberModel {
    private Long id;
    private String firstName;
    private String lastName;
    private String description;
    private String picture;
    private boolean deleted;
    private List<ServiceEntity> services;
}
