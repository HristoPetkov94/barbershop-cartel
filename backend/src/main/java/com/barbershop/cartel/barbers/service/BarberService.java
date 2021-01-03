package com.barbershop.cartel.barbers.service;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.interfaces.BarberInterface;
import com.barbershop.cartel.barbers.models.BarberModel;
import com.barbershop.cartel.barbers.repository.BarberRepository;
import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.services.models.ServiceModel;
import com.barbershop.cartel.utils.Base64Util;
import com.barbershop.cartel.utils.PictureUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class BarberService implements BarberInterface {

    @Autowired
    private BarberRepository barberRepository;

    @Override
    public List<BarberModel> getAllBarbers() {

        List<BarberModel> barbers = new ArrayList<>();
        Iterable<BarberEntity> allBarbers = barberRepository.findAll();

        for (BarberEntity barber : allBarbers) {

            BarberModel barberModel = BarberModel.builder()
                    .id(barber.getId())
                    .firstName(barber.getFirstName())
                    .lastName(barber.getLastName())
                    .description(barber.getDescription())
                    .picture(barber.getPicture())
                    .services(barber.getServices())
                    .build();

            barbers.add(barberModel);
        }

        return barbers;
    }

    @Override
    public Optional<BarberEntity> getBarberById(long barberId) {
        return barberRepository.findById(barberId);
    }

/*    @Override
    public BarberModel getBarberById(long barberId) {

        Optional<BarberEntity> barberOptional = barberRepository.findById(barberId);

        if (barberOptional.isEmpty()) {
            throw new UsernameNotFoundException("Barber with id: " + barberId + " does not exist");
        }

        BarberEntity barber = barberOptional.get();

        return BarberModel.builder()
                .id(barber.getId())
                .firstName(barber.getFirstName())
                .lastName(barber.getLastName())
                .description(barber.getDescription())
                .picture(barber.getPicture())
                .build();
    }*/


    @Override
    public void update(BarberModel barberModel) {
        Optional<BarberEntity> barberOptional = barberRepository.findById(barberModel.getId());

        if (barberOptional.isEmpty()) {
            throw new UsernameNotFoundException("Barber with id: " + barberModel.getId() + " does not exist");
        }

        BarberEntity barber = barberOptional.get();

        barber.setPicture(barberModel.getPicture());
        barber.setFirstName(barberModel.getFirstName());
        barber.setLastName(barberModel.getLastName());
        barber.setDescription(barberModel.getDescription());

        barberRepository.save(barber);

    }

    @Override
    public void updateAll(List<BarberModel> barbers) {
        for (BarberModel barber : barbers) {

            if (barber.isDeleted()) {
                barberRepository.deleteById(barber.getId());
                continue;
            }

            updateBarber(barber);
        }
    }

    private void updateBarber(BarberModel barberModel) {

        Optional<BarberEntity> optionalEntity = barberRepository.findById(barberModel.getId());

        BarberEntity barber = optionalEntity.orElse(new BarberEntity());

        barber.setPicture(barberModel.getPicture());
        barber.setFirstName(barberModel.getFirstName());
        barber.setLastName(barberModel.getLastName());
        barber.setDescription(barberModel.getDescription());

        barberRepository.save(barber);
    }
}
