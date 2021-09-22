package com.barbershop.cartel.notifications.email.repository;

import com.barbershop.cartel.notifications.email.entity.EmailDetailEntity;
import com.barbershop.cartel.notifications.email.enums.EmailTypeEnum;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailDetailRepository extends CrudRepository<EmailDetailEntity, Long> {
    Optional<EmailDetailEntity> findByEmailType(EmailTypeEnum emailType);
}