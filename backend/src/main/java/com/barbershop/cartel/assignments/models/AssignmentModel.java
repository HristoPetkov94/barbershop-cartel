package com.barbershop.cartel.assignments.models;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentModel {
    private long id;
    private int price;
    private int duration;
    private long barberId;
    private long serviceId;
}
