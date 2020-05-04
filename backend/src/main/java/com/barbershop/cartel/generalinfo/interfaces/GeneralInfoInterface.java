package com.barbershop.cartel.generalinfo.interfaces;

import com.barbershop.cartel.generalinfo.models.GeneralInfoModel;

import java.util.List;

public interface GeneralInfoInterface {
    void save(GeneralInfoModel generalInfo);

    List<GeneralInfoModel> getGeneralInfo();
}
