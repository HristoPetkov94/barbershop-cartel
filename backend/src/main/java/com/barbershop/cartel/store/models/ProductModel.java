package com.barbershop.cartel.store.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductModel {
    private String title;
    private String description;
    private int price;
    private List<ProductDetailsModel> details;
}