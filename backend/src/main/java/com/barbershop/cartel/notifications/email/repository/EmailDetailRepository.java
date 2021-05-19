package com.barbershop.cartel.notifications.email.repository;

import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import com.barbershop.cartel.notifications.email.entity.EmailDetailEntity;
import com.barbershop.cartel.notifications.email.enums.EmailTypeEnum;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailDetailRepository extends CrudRepository<EmailDetailEntity, Long> {

    Optional<EmailDetailEntity> findByEmailType(EmailTypeEnum emailType);

    Optional<EmailDetailEntity> findByEmailTypeAndLanguage(EmailTypeEnum emailType, LanguageEnum language);

    Iterable<EmailDetailEntity> findAllByLanguage(LanguageEnum language);
}