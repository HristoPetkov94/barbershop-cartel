package com.barbershop.cartel.barbers.service;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.interfaces.BarberInterface;
import com.barbershop.cartel.barbers.models.BarberModel;
import com.barbershop.cartel.barbers.repository.BarberRepository;
import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.services.models.ServiceModel;
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
    public long createBarber(BarberModel barberModel) {

        BarberEntity barber = new BarberEntity();

        barber.setFirstName(barberModel.getFirstName());
        barber.setLastName(barberModel.getLastName());
        barber.setDescription(barberModel.getDescription());
        barber.setPicture(barberModel.getPicture());
        barber.setFacebook(barberModel.getFacebook());
        barber.setInstagram(barberModel.getInstagram());

        barberRepository.save(barber);

        return barber.getId();
    }

    @Override
    public void updateBarber(BarberModel barberModel) throws Exception {

        Optional<BarberEntity> barber = barberRepository.findById(barberModel.getId());

        if (barber.isEmpty()) {
            throw new Exception("Barber with id:" + barberModel.getId() + " is not existing");
        }

        barber.get().setFirstName(barberModel.getFirstName());
        barber.get().setLastName(barberModel.getLastName());
        barber.get().setDescription(barberModel.getDescription());
        barber.get().setPicture(barberModel.getPicture());
        barber.get().setFacebook(barberModel.getFacebook());
        barber.get().setInstagram(barberModel.getInstagram());

        barberRepository.save(barber.get());
    }

    @Override
    public void deleteBarber(long barberId) {
        barberRepository.deleteById(barberId);
    }

    @Override
    public ServiceEntity createService(long barberId, ServiceModel serviceModel) throws Exception {

        Optional<BarberEntity> barber = barberRepository.findById(barberId);

        if (barber.isEmpty()) {
            throw new Exception("Barber with id:" + barberId + " is not existing");
        }

        List<ServiceEntity> services = barber.get().getServices();

        ServiceEntity service = new ServiceEntity();

        service.setServiceType(serviceModel.getServiceType());
        service.setPrice(serviceModel.getPrice());
        service.setDuration(serviceModel.getDuration());
        service.setDescription(serviceModel.getDescription());
        service.setPicture(serviceModel.getPicture());

        services.add(service);

        barberRepository.save(barber.get());

        return barber.get().getServices().stream().filter(s -> service.getServiceType().equals(s.getServiceType())).findAny().get();
    }

    @Override
    public void updateService(long barberId, ServiceModel serviceModel) throws Exception {

        Optional<BarberEntity> barber = barberRepository.findById(barberId);

        if (barber.isEmpty()) {
            throw new Exception("Barber with id:" + barberId + " is not existing");
        }

        for (ServiceEntity service : barber.get().getServices()) {

            if (serviceModel.getId() == service.getId()) {

                service.setServiceType(serviceModel.getServiceType());
                service.setPrice(serviceModel.getPrice());
                service.setDuration(serviceModel.getDuration());
                service.setDescription(serviceModel.getDescription());
                service.setPicture(serviceModel.getPicture());
            }
        }

        barberRepository.save(barber.get());
    }

    @Override
    public void deleteService(long barberId, long serviceId) throws Exception {

        Optional<BarberEntity> barber = barberRepository.findById(barberId);

        if (barber.isEmpty()) {
            throw new Exception("Barber with id:" + barberId + " is not existing");
        }

        barber.get().getServices().removeIf(service -> service.getId() == serviceId);

        barberRepository.save(barber.get());
    }
}
