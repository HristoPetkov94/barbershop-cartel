package com.barbershop.cartel.general.config.info.controller;

import com.barbershop.cartel.general.config.messages.enums.LanguageEnum;
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
    public GeneralConfigurationModel getConfiguration(@RequestParam LanguageEnum lang) {
        return generalConfigurationInterface.getConfiguration(lang);
    }

    @PostMapping
    public void updateConfiguration(@RequestBody GeneralConfigurationModel config) {
        generalConfigurationInterface.updateConfiguration(config);
    }
}
