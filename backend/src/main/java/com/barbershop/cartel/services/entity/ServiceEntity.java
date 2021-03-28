package com.barbershop.cartel.services.entity;

import com.barbershop.cartel.assignments.entity.AssignmentEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = ServiceEntity.TABLE_NAME)
public class ServiceEntity {

    public static final String TABLE_NAME = "services";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "service_title")
    private String serviceTitle;

    @Column(name = "picture", columnDefinition = "TEXT")
    private String picture;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AssignmentEntity> assignments;
}
