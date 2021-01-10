package com.barbershop.cartel.services.models;

import com.barbershop.cartel.services.entity.ServiceEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ServiceModel {
    private Long id;
    private String serviceType;
    private int price;
    private int duration;
    private String picture;
    private String description;

    public ServiceModel(ServiceEntity entity) {
        this.id = entity.getId();
        this.serviceType = entity.getServiceType();
        this.price = entity.getPrice();
        this.duration = entity.getDuration();
        this.picture = entity.getPicture();
        this.description = entity.getDescription();
    }
}
