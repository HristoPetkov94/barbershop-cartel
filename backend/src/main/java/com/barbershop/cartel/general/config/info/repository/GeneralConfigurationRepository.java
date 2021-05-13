package com.barbershop.cartel.general.config.info.repository;

import com.barbershop.cartel.general.config.info.entity.GeneralConfigurationEntity;
import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GeneralConfigurationRepository extends CrudRepository<GeneralConfigurationEntity, Long> {

    Optional<GeneralConfigurationEntity> findByLanguage(LanguageEnum language);
}
