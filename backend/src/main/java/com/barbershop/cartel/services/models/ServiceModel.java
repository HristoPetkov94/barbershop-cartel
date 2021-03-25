package com.barbershop.cartel.services.models;

import com.barbershop.cartel.services.entity.ServiceEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceModel {
    private Long id;
    private String serviceTitle;
    private String picture;
    private String description;

    public ServiceModel(ServiceEntity entity) {
        this.id = entity.getId();
        this.serviceTitle = entity.getServiceTitle();
        this.picture = entity.getPicture();
        this.description = entity.getDescription();
    }
}
