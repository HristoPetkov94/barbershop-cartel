package com.barbershop.cartel.clients.repository;

import com.barbershop.cartel.clients.entity.ClientEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends CrudRepository<ClientEntity, Long> {
    Optional<ClientEntity> findByPhone(String phone);


//    @Query("SELECT new com.barbershop.cartel.clients.entity.ClientStatistics(c.id, " +
//            "c.email, " +
//            "c.name, " +
//            "c.phone, " +
//            "count(a.noShow = false)) " +
//            "FROM ClientEntity c JOIN AppointmentEntity a ON c.phone=a.phone " +
//            "GROUP BY c.id, c.phone, c.name, c.email")
//    List<ClientStatistics> getStatistics();
}
