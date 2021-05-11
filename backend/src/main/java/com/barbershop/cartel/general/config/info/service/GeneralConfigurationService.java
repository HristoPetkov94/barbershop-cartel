package com.barbershop.cartel.general.config.info.service;

import com.barbershop.cartel.errors.CartelCustomException;
import com.barbershop.cartel.general.config.info.entity.GeneralConfigurationEntity;
import com.barbershop.cartel.general.config.messages.enums.LanguageEnum;
import com.barbershop.cartel.general.config.info.interfaces.GeneralConfigurationInterface;
import com.barbershop.cartel.general.config.info.models.GeneralConfigurationModel;
import com.barbershop.cartel.general.config.info.repository.GeneralConfigurationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GeneralConfigurationService implements GeneralConfigurationInterface {

    @Autowired
    private GeneralConfigurationRepository generalConfigurationRepository;

    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public GeneralConfigurationModel getConfiguration(LanguageEnum language) {

        GeneralConfigurationEntity configuration = generalConfigurationRepository.findByLanguage(language)
                .orElseThrow(() -> new CartelCustomException("No configuration was found"));

        return modelMapper.map(configuration, GeneralConfigurationModel.class);
    }

    @Override
    public void updateConfiguration(GeneralConfigurationModel config) {

        GeneralConfigurationEntity configuration = generalConfigurationRepository.findByLanguage(config.getLanguage())
                .orElseThrow(() -> new CartelCustomException("No configuration was found"));

        long id = configuration.getId();

        GeneralConfigurationEntity generalConfigurationEntity = modelMapper.map(config, GeneralConfigurationEntity.class);
        generalConfigurationEntity.setId(id);


        generalConfigurationRepository.save(generalConfigurationEntity);
    }

}
