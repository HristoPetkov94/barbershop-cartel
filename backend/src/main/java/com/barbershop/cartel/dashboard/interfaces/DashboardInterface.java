package com.barbershop.cartel.dashboard.interfaces;

import com.barbershop.cartel.dashboard.models.DashboardRequestModel;
import com.barbershop.cartel.dashboard.models.DashboardResponseModel;

public interface DashboardInterface {
    DashboardResponseModel generateReport(DashboardRequestModel requestModel);
}
