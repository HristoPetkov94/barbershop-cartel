package com.barbershop.cartel.clients.models;

import lombok.Data;

@Data
public class ClientModel {

    private long id;

    private String email;
    private String name;
    private String phone;
}
