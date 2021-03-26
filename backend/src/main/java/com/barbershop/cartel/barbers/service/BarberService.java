package com.barbershop.cartel.barbers.service;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.interfaces.BarberInterface;
import com.barbershop.cartel.barbers.models.BarberModel;
import com.barbershop.cartel.barbers.repository.BarberRepository;
import com.barbershop.cartel.errors.CartelCustomException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class BarberService implements BarberInterface {

    @Autowired
    private BarberRepository barberRepository;


    @Override
    public List<BarberModel> getBarbers() {

        List<BarberModel> barbers = new ArrayList<>();
        Iterable<BarberEntity> allBarbers = barberRepository.findAllByOrderByIdDesc();

        for (BarberEntity barber : allBarbers) {

            BarberModel barberModel = BarberModel.builder()
                    .id(barber.getId())
                    .firstName(barber.getFirstName())
                    .lastName(barber.getLastName())
                    .description(barber.getDescription())
                    .picture(barber.getPicture())
                    .facebook(barber.getFacebook())
                    .instagram(barber.getInstagram())
                    .build();

            barbers.add(barberModel);
        }

        return barbers;
    }

    @Override
    public BarberEntity getBarberById(long barberId) {
        return barberRepository.findById(barberId)
                .orElseThrow(() -> new CartelCustomException("Barber with id:" + barberId + " is not existing"));
    }

    @Override
    public BarberEntity createBarber(BarberModel barberModel) {

        BarberEntity barber = new BarberEntity();

        barber.setFirstName(barberModel.getFirstName());
        barber.setLastName(barberModel.getLastName());
        barber.setDescription(barberModel.getDescription());
        barber.setPicture(barberModel.getPicture());
        barber.setFacebook(barberModel.getFacebook());
        barber.setInstagram(barberModel.getInstagram());

        return barberRepository.save(barber);
    }

    @Override
    public void updateBarber(BarberModel barberModel) {

        Long barberId = barberModel.getId();

        BarberEntity barber = barberRepository.findById(barberId)
                .orElseThrow(() -> new CartelCustomException("Barber with id:" + barberId + " is not existing"));

        barber.setFirstName(barberModel.getFirstName());
        barber.setLastName(barberModel.getLastName());
        barber.setDescription(barberModel.getDescription());
        barber.setPicture(barberModel.getPicture());
        barber.setFacebook(barberModel.getFacebook());
        barber.setInstagram(barberModel.getInstagram());

        barberRepository.save(barber);
    }

    @Override
    public void deleteBarber(long barberId) {

        BarberEntity barber = barberRepository.findById(barberId)
                .orElseThrow(() -> new CartelCustomException("Barber with id:" + barberId + " is not existing"));

        barberRepository.delete(barber);
    }
}