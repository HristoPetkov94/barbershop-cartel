package com.barbershop.cartel.general.config.info.controller;

import com.barbershop.cartel.general.config.info.interfaces.GeneralConfigurationInterface;
import com.barbershop.cartel.general.config.info.models.GeneralConfigurationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/general-configuration")
public class GeneralConfigurationController {

    @Autowired
    private GeneralConfigurationInterface generalConfigurationInterface;

    @GetMapping
    public GeneralConfigurationModel getConfiguration() {
        return generalConfigurationInterface.getConfiguration();
    }

    @PostMapping
    public void saveConfiguration(@RequestBody GeneralConfigurationModel config) {
        generalConfigurationInterface.updateConfiguration(config);
    }
}
