package com.barbershop.cartel.services.models;

import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.utils.InternationalString;
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
    private InternationalString serviceTitle;
    private InternationalString description;
    private String picture;

    public ServiceModel(ServiceEntity entity) {
        this.id = entity.getId();
        this.serviceTitle = entity.getServiceTitle();
        this.description = entity.getDescription();
        this.picture = entity.getPicture();
    }
}
