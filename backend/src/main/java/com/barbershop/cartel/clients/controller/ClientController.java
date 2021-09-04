package com.barbershop.cartel.clients.controller;

import com.barbershop.cartel.clients.interfaces.ClientInterface;
import com.barbershop.cartel.clients.models.ClientModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    private ClientInterface clientInterface;

    @GetMapping
    public List<ClientModel> all() {

        return clientInterface.all();
    }

    @PostMapping("/ban/{id}/{banned}")
    public void patch(@PathVariable long id, @PathVariable boolean banned) {
        clientInterface.ban(id, banned);
    }
}
