package com.barbershop.cartel.general.config.messages.interfaces;

import com.barbershop.cartel.general.config.messages.enums.LanguageEnum;
import com.barbershop.cartel.general.config.messages.models.GeneralConfigurationModel;

public interface GeneralConfigurationInterface {
    GeneralConfigurationModel getConfiguration(LanguageEnum language);

    void updateConfiguration(GeneralConfigurationModel config);
}
