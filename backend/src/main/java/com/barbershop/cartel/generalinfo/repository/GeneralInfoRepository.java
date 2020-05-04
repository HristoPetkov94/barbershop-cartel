package com.barbershop.cartel.generalinfo.repository;

import com.barbershop.cartel.generalinfo.entity.GeneralInfoEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralInfoRepository extends CrudRepository<GeneralInfoEntity, Long> {
}
