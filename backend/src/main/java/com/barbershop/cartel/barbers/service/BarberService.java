package com.barbershop.cartel.barbers.service;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.interfaces.BarberInterface;
import com.barbershop.cartel.barbers.models.BarberModel;
import com.barbershop.cartel.barbers.repository.BarberRepository;
import com.barbershop.cartel.utils.Base64Util;
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

    private final static String DEFAULT_PICTURE_PATH = "images/defual-profile-picture.png";

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
    public void uploadPicture(long barberId, byte[] image) {

        String picture = Base64.encodeBase64String(image);

        Optional<BarberEntity> detailsOptional = barberRepository.findById(barberId);

        if (detailsOptional.isEmpty()) {
            throw new UsernameNotFoundException("No barber were found with id: " + barberId);
        }

        BarberEntity details = detailsOptional.get();
        details.setPicture(("data:image/png;base64," + picture));

        barberRepository.save(details);
    }

    @Override
    public void updateBarber(BarberModel barberModel) {

        Optional<BarberEntity> barberOptional = barberRepository.findById(barberModel.getId());

        if (barberOptional.isEmpty()) {
            throw new UsernameNotFoundException("Barber with id: " + barberModel.getId() + " is not existing.");
        }

        BarberEntity barber = barberOptional.get();

        barber.setFirstName(barberModel.getFirstName());
        barber.setLastName(barberModel.getLastName());
        barber.setDescription(barberModel.getDescription());
        barber.setPicture(barber.getPicture());

        barberRepository.save(barber);
    }

    private String getDefaultPicture() {

        String picture = "";

        try {
            File f = new ClassPathResource(DEFAULT_PICTURE_PATH).getFile();
            picture = Base64Util.encodeFileToBase64Binary(f);
        } catch (Exception e) {
            log.error("Default picture is missing");
            e.printStackTrace();
        }

        return picture;
    }
}
