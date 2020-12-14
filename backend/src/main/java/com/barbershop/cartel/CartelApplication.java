package com.barbershop.cartel;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.repository.BarberRepository;
import com.barbershop.cartel.security.models.UserModel;
import com.barbershop.cartel.security.service.JwtUserDetailsService;
import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.services.repository.ServiceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

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

            ServiceEntity service1 = createService1();
            ServiceEntity service2 = createService2();

            serviceRepository.save(service1);
            serviceRepository.save(service2);

            List<ServiceEntity> allServices = serviceRepository.findAll();

            BarberEntity barber1 = createBarber1(allServices);
            BarberEntity barber2 = createBarber2(allServices);

            barberRepository.save(barber1);
            barberRepository.save(barber2);
        };
    }

    public static BarberEntity createBarber1(List<ServiceEntity> services) {

        BarberEntity barber = new BarberEntity();

        barber.setFirstName("Пламен");
        barber.setLastName("Маринов");
        barber.setDescription("Инженер-Архитектът под чиито надзор се изпълнява този проект.");
        barber.setPicture("images/defual-profile-picture.png");
        barber.setServices(services);

        return barber;
    }

    public static BarberEntity createBarber2(List<ServiceEntity> services) {

        BarberEntity barber = new BarberEntity();

        barber.setFirstName("Христо");
        barber.setLastName("Петков");
        barber.setDescription("Инженер-Предприемач, който ще доведе до край този проект.");
        barber.setPicture("images/defual-profile-picture.png");
        barber.setServices(services);

        return barber;
    }

    public static ServiceEntity createService1() {

        ServiceEntity service = new ServiceEntity();

        service.setServiceType("Подстригване / Haircurt");
        service.setDescription("Модерна прическа и стил на мъжете от нашите професионални Барбъри / Modern man's haircut and styling from our professional Barbers");
        service.setDuration(30);
        service.setPrice(15);

        return service;
    }

    public static ServiceEntity createService2() {

        ServiceEntity service = new ServiceEntity();

        service.setServiceType("Комплекс / Complex");
        service.setDescription("Подстригване и стайлинг, корекция на брадата Ви. / Haircut and Styling, correction of your beard");
        service.setDuration(60);
        service.setPrice(23);

        return service;
    }
}
