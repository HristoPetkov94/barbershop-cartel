package com.barbershop.cartel.general.config.messages.repository;

import com.barbershop.cartel.general.config.messages.entity.GeneralConfigurationEntity;
import com.barbershop.cartel.general.config.messages.enums.LanguageEnum;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GeneralConfigurationRepository extends CrudRepository<GeneralConfigurationEntity, Long> {

    Optional<GeneralConfigurationEntity> findByLanguage(LanguageEnum language);
}
