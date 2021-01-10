package com.barbershop.cartel.barbers.service;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.interfaces.BarberInterface;
import com.barbershop.cartel.barbers.models.BarberModel;
import com.barbershop.cartel.barbers.repository.BarberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class BarberService implements BarberInterface {

    @Autowired
    private BarberRepository barberRepository;

    @Override
    public List<BarberModel> getBarbers() {

        List<BarberModel> barbers = new ArrayList<>();
        Iterable<BarberEntity> allBarbers = barberRepository.findAll();

        for (BarberEntity barber : allBarbers) {

            BarberModel barberModel = BarberModel.builder()
                    .id(barber.getId())
                    .firstName(barber.getFirstName())
                    .lastName(barber.getLastName())
                    .description(barber.getDescription())
                    .picture(barber.getPicture())
                    .facebook(barber.getFacebook())
                    .instagram(barber.getInstagram())
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

    @Override
    public void createBarbers(List<BarberModel> barbers) {

        barberRepository.deleteAll();

        for (BarberModel barber : barbers) {
            createBarber(barber);
        }
    }

    private void createBarber(BarberModel barberModel) {

        BarberEntity barber = new BarberEntity();

        barber.setPicture(barberModel.getPicture());
        barber.setFirstName(barberModel.getFirstName());
        barber.setLastName(barberModel.getLastName());
        barber.setDescription(barberModel.getDescription());
        barber.setFacebook(barberModel.getFacebook());
        barber.setInstagram(barberModel.getInstagram());

        barberRepository.save(barber);
    }
}
