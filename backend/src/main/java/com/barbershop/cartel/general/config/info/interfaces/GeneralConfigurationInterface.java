package com.barbershop.cartel.general.config.info.interfaces;

import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import com.barbershop.cartel.general.config.info.models.GeneralConfigurationModel;

public interface GeneralConfigurationInterface {
    GeneralConfigurationModel getConfiguration(LanguageEnum language);

    void updateConfiguration(GeneralConfigurationModel config);
}
