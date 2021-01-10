package com.barbershop.cartel;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.repository.BarberRepository;
import com.barbershop.cartel.security.models.UserModel;
import com.barbershop.cartel.security.service.JwtUserDetailsService;
import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.services.repository.ServiceRepository;
import com.barbershop.cartel.utils.Base64Util;
import com.barbershop.cartel.utils.PictureUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class CartelApplication {

    public static void main(String[] args) {
        SpringApplication.run(CartelApplication.class, args);
    }

    @Bean
    CommandLineRunner init(JwtUserDetailsService userService, BarberRepository barberRepository, ServiceRepository serviceRepository) {
        return args -> {

            UserModel user = new UserModel();

            user.setEmail("admin@cartel.bg");
            user.setPassword("123");

            userService.save(user);

            BarberEntity barber1 = createBarber1();
            BarberEntity barber2 = createBarber2();

            barberRepository.save(barber1);
            barberRepository.save(barber2);

            ServiceEntity service1 = createService1(barber1.getId());
            ServiceEntity service2 = createService2(barber1.getId());
            ServiceEntity service3 = createService3(barber2.getId());
            ServiceEntity service4 = createService4(barber2.getId());
            ServiceEntity service5 = createService5(barber2.getId());

            serviceRepository.save(service1);
            serviceRepository.save(service2);
            serviceRepository.save(service3);
            serviceRepository.save(service4);
            serviceRepository.save(service5);
        };
    }

    public static BarberEntity createBarber1() throws Exception {

        BarberEntity barber = new BarberEntity();

        barber.setFirstName("Пламен");
        barber.setLastName("Маринов");
        barber.setDescription("Инженер-Архитектът под чиито надзор се изпълнява този проект.");
        barber.setPicture(PictureUtils.getDefaultPicture());
        //barber.setServices(services);

        return barber;
    }

    public static BarberEntity createBarber2() throws Exception {

        BarberEntity barber = new BarberEntity();

        barber.setFirstName("Христо");
        barber.setLastName("Петков");
        barber.setDescription("Инженер-Предприемач, който ще доведе до край този проект.");
        barber.setPicture(PictureUtils.getDefaultPicture());
        //barber.setServices(services);

        return barber;
    }

    public static ServiceEntity createService1(long barberId) {

        ServiceEntity service = new ServiceEntity();

        service.setServiceType("Подстригване / Haircurt");
        service.setDescription("Модерна прическа и стил на мъжете от нашите професионални Барбъри / Modern man's haircut and styling from our professional Barbers");
        service.setDuration(30);
        service.setPrice(15);
        service.setBarberId(barberId);

        return service;
    }

    public static ServiceEntity createService2(long barberId) {

        ServiceEntity service = new ServiceEntity();

        service.setServiceType("Комплекс / Complex");
        service.setDescription("Подстригване и стайлинг, корекция на брадата Ви. / Haircut and Styling, correction of your beard");
        service.setDuration(60);
        service.setPrice(23);
        service.setBarberId(barberId);
        return service;
    }

    public static ServiceEntity createService3(long barberId) {

        ServiceEntity service = new ServiceEntity();

        service.setServiceType("Детско постригване / Children's haircut");
        service.setDescription("Професионална прическа за деца до 5год. / Professional hairstyle for children up to 5 years\n");
        service.setDuration(30);
        service.setPrice(10);
        service.setBarberId(barberId);
        return service;
    }

    public static ServiceEntity createService4(long barberId) {

        ServiceEntity service = new ServiceEntity();

        service.setServiceType("Beard / Shaving - Брада / Бръснене");
        service.setDescription("Професионален дизайн на брада или бръснене. / Professional beard design or a nice shave.");
        service.setDuration(30);
        service.setPrice(15);
        service.setBarberId(barberId);
        return service;
    }

    public static ServiceEntity createService5(long barberId) {

        ServiceEntity service = new ServiceEntity();

        service.setServiceType("Комплекс / Complex");
        service.setDescription("Подстригване и стайлинг, корекция на брадата Ви. / Haircut and Styling, correction of your beard");
        service.setDuration(60);
        service.setPrice(23);
        service.setBarberId(barberId);
        return service;
    }
}
