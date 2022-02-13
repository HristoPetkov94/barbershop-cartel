package com.barbershop.cartel.dashboard.controller;

import com.barbershop.cartel.dashboard.interfaces.DashboardInterface;
import com.barbershop.cartel.dashboard.models.DashboardRequestModel;
import com.barbershop.cartel.dashboard.models.DashboardResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardInterface dashboardInterface;

    @PostMapping
    public DashboardResponseModel generateReport(@RequestBody DashboardRequestModel requestModel) {
       return dashboardInterface.generateReport(requestModel);
    }
}
