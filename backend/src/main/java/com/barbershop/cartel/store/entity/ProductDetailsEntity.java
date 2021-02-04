package com.barbershop.cartel.store.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = ProductDetailsEntity.TABLE_NAME)
public class ProductDetailsEntity {

    public static final String TABLE_NAME = "product_details";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "picture", columnDefinition = "TEXT")
    private String picture;
}
