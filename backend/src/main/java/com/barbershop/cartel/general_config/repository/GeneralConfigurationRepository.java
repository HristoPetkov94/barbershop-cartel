package com.barbershop.cartel.general_config.repository;

import com.barbershop.cartel.general_config.entity.GeneralConfigurationEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralConfigurationRepository extends CrudRepository<GeneralConfigurationEntity, Long> {
}
