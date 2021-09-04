package com.barbershop.cartel;

import com.barbershop.cartel.clients.entity.ClientEntity;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

@Slf4j
@SpringBootTest
@ActiveProfiles("dev")
class CartelApplicationTests {

    @Autowired
    private EntityManager em;

    @Test
    void testCRBuilderClient() {
        CriteriaBuilder cb = em.getCriteriaBuilder();

        CriteriaQuery<ClientEntity> cq = cb.createQuery(ClientEntity.class);

        Root<ClientEntity> book = cq.from(ClientEntity.class);
        Predicate authorNamePredicate = cb.equal(book.get("phone"), "0878889136");

        cq.where(authorNamePredicate);

        TypedQuery<ClientEntity> query = em.createQuery(cq);

        query.getResultList().forEach(x->log.debug(x.toString()));
    }
}
