package com.barbershop.cartel.barbers.service;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.interfaces.BarberInterface;
import com.barbershop.cartel.barbers.models.BarberModel;
import com.barbershop.cartel.barbers.repository.BarberRepository;
import com.barbershop.cartel.errors.CartelCustomException;
import com.barbershop.cartel.work.weekday.WorkWeekDayEntity;
import com.barbershop.cartel.work.weekday.WorkWeekDayRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class BarberService implements BarberInterface {

    @Autowired
    private BarberRepository barberRepository;

    @Autowired
    private  WorkWeekDayRepository workWeekDayRepository;

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
                    .facebook(barber.getSocialMedia().getFacebook())
                    .instagram(barber.getSocialMedia().getInstagram())
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
        barber.getSocialMedia().setFacebook(barberModel.getFacebook());
        barber.getSocialMedia().setInstagram(barberModel.getInstagram());

        BarberEntity save = barberRepository.save(barber);

        createWorkingWeek(save, workWeekDayRepository);

        return save;
    }

    private void createWorkingWeek(BarberEntity barber, WorkWeekDayRepository workWeekDayRepository) {

        for (DayOfWeek dayOfWeek : DayOfWeek.values()) {
            WorkWeekDayEntity entity = new WorkWeekDayEntity();

            LocalTime from = LocalTime.of(8, 0);
            LocalTime to = LocalTime.of(18, 0);

            entity.setBarber(barber);

            entity.setDayOfWeek(dayOfWeek);

            entity.setFrom(from);
            entity.setTo(to);

            boolean notWorking = dayOfWeek == DayOfWeek.SUNDAY || dayOfWeek == DayOfWeek.SATURDAY;

            entity.setNotWorking(notWorking);

            workWeekDayRepository.save(entity);
        }
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
        barber.getSocialMedia().setFacebook(barberModel.getFacebook());
        barber.getSocialMedia().setInstagram(barberModel.getInstagram());

        barberRepository.save(barber);
    }

    @Override
    public void deleteBarber(long barberId) {

        BarberEntity barber = barberRepository.findById(barberId)
                .orElseThrow(() -> new CartelCustomException("Barber with id:" + barberId + " is not existing"));

        barberRepository.delete(barber);
    }
}
