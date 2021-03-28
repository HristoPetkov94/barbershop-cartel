package com.barbershop.cartel.infrastructure;

import com.barbershop.cartel.infrastructure.Mappings;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig implements InitializingBean {

    @Autowired
    private Mappings[] mappings;

    @Bean
    public ModelMapper getModelMapper() {
        return new ModelMapper();
    }

    @Override
    public void afterPropertiesSet() {

        for (Mappings mapping : mappings) {
            mapping.configure(getModelMapper());
        }
    }
}
