package com.barbershop.cartel.services.entity;

import com.barbershop.cartel.assignments.entity.AssignmentEntity;
import com.barbershop.cartel.utils.InternationalString;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
@Table(name = ServiceEntity.TABLE_NAME)
public class ServiceEntity {

    public static final String TABLE_NAME = "services";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Type(type = "jsonb")
    @Column(name = "service_title", columnDefinition = "jsonb")
    private InternationalString serviceTitle;

    @Type(type = "jsonb")
    @Column(name = "description", columnDefinition = "jsonb")
    private InternationalString description;

    @Column(name = "picture", columnDefinition = "TEXT")
    private String picture;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AssignmentEntity> assignments;
}
