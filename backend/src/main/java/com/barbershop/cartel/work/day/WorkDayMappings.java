package com.barbershop.cartel.work.day;

import com.barbershop.cartel.infrastructure.Mappings;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class WorkDayMappings implements Mappings {

    @Override
    public void configure(ModelMapper mapper) {

        //mapper.createTypeMap<WorkDayEntity, WorkDayModel>
    }
}
