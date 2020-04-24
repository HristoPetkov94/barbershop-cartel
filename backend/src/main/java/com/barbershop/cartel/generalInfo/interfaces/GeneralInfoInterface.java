package com.barbershop.cartel.generalInfo.interfaces;

import com.barbershop.cartel.generalInfo.models.GeneralInfoModel;

import java.util.List;

public interface GeneralInfoInterface {
    void save(GeneralInfoModel generalInfo);

    List<GeneralInfoModel> getGeneralInfo();
}
