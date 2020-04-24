package com.barbershop.cartel.generalInfo.repository;

import com.barbershop.cartel.generalInfo.entity.GeneralInfoEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralInfoRepository extends CrudRepository<GeneralInfoEntity, Long> {
}
