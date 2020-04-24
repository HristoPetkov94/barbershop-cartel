package com.barbershop.cartel.users.repository;

import com.barbershop.cartel.users.entity.UserDetailsEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailsRepository extends CrudRepository<UserDetailsEntity, Long> {

}
