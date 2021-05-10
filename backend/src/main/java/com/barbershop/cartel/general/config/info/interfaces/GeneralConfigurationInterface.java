package com.barbershop.cartel.general.config.info.interfaces;

import com.barbershop.cartel.general.config.info.models.GeneralConfigurationModel;
import com.barbershop.cartel.general.config.messages.enums.LanguageEnum;

public interface GeneralConfigurationInterface {
    GeneralConfigurationModel getConfiguration(LanguageEnum language);

    void updateConfiguration(GeneralConfigurationModel config);
}
