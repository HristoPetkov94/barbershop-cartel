package com.barbershop.cartel.general.config.info.interfaces;

import com.barbershop.cartel.general.config.info.models.GeneralConfigurationModel;

public interface GeneralConfigurationInterface {
    GeneralConfigurationModel getConfiguration();

    void updateConfiguration(GeneralConfigurationModel config);
}
