package com.barbershop.cartel.generalinfo.controller;

import com.barbershop.cartel.generalinfo.interfaces.GeneralInfoInterface;
import com.barbershop.cartel.generalinfo.models.GeneralInfoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/general-info")
public class GeneralInfoController {

    @Autowired
    private GeneralInfoInterface generalInfoInterface;

    @PostMapping
    public void save(@RequestBody GeneralInfoModel generalInfo) {
        generalInfoInterface.save(generalInfo);
    }

    @GetMapping
    public List<GeneralInfoModel> getGeneralInfo() {
        return generalInfoInterface.getGeneralInfo();
    }
}
