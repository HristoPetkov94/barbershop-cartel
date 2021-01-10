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

            /*ServiceEntity service1 = createService1();
            ServiceEntity service2 = createService2();
            ServiceEntity service3 = createService3();
            ServiceEntity service4 = createService4();
            ServiceEntity service5 = createService5();

            serviceRepository.save(service1);
            serviceRepository.save(service2);
            serviceRepository.save(service3);
            serviceRepository.save(service4);
            serviceRepository.save(service5);


            List<ServiceEntity> allServices = serviceRepository.findAll();

            List<ServiceEntity> servicesBarber1 = new ArrayList<>();
            servicesBarber1.add(allServices.get(0));
            servicesBarber1.add(allServices.get(1));

            List<ServiceEntity> servicesBarber2 = new ArrayList<>();
            servicesBarber2.add(allServices.get(2));
            servicesBarber2.add(allServices.get(3));
            servicesBarber2.add(allServices.get(4));

            BarberEntity barber1 = createBarber1(servicesBarber1);
            BarberEntity barber2 = createBarber2(servicesBarber2);

            barberRepository.save(barber1);
            barberRepository.save(barber2);*/
        };
    }

    public static BarberEntity createBarber1(List<ServiceEntity> services) throws Exception {

        BarberEntity barber = new BarberEntity();

        barber.setFirstName("Пламен");
        barber.setLastName("Маринов");
        barber.setDescription("Инженер-Архитектът под чиито надзор се изпълнява този проект.");
        barber.setPicture(PictureUtils.getDefaultPicture());
        barber.setServices(services);

        return barber;
    }

    public static BarberEntity createBarber2(List<ServiceEntity> services) throws Exception {

        BarberEntity barber = new BarberEntity();

        barber.setFirstName("Христо");
        barber.setLastName("Петков");
        barber.setDescription("Инженер-Предприемач, който ще доведе до край този проект.");
        barber.setPicture(PictureUtils.getDefaultPicture());
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

    public static ServiceEntity createService3() {

        ServiceEntity service = new ServiceEntity();

        service.setServiceType("Детско постригване / Children's haircut");
        service.setDescription("Професионална прическа за деца до 5год. / Professional hairstyle for children up to 5 years\n");
        service.setDuration(30);
        service.setPrice(10);

        return service;
    }

    public static ServiceEntity createService4() {

        ServiceEntity service = new ServiceEntity();

        service.setServiceType("Beard / Shaving - Брада / Бръснене");
        service.setDescription("Професионален дизайн на брада или бръснене. / Professional beard design or a nice shave.");
        service.setDuration(30);
        service.setPrice(15);

        return service;
    }

    public static ServiceEntity createService5() {

        ServiceEntity service = new ServiceEntity();

        service.setServiceType("Комплекс / Complex");
        service.setDescription("Подстригване и стайлинг, корекция на брадата Ви. / Haircut and Styling, correction of your beard");
        service.setDuration(60);
        service.setPrice(23);

        return service;
    }
}
