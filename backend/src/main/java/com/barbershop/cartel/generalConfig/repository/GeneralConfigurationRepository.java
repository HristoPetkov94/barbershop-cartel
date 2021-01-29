package com.barbershop.cartel.generalConfig.repository;

import com.barbershop.cartel.generalConfig.entity.GeneralConfigurationEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralConfigurationRepository extends CrudRepository<GeneralConfigurationEntity, Long> {
}
