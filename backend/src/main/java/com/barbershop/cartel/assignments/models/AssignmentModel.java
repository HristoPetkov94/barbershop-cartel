package com.barbershop.cartel.assignments.models;

import com.barbershop.cartel.barbers.models.BarberModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentModel {
    private long id;
    private int price;
    private int duration;
    private BarberModel barber;
    private long serviceId;
}
