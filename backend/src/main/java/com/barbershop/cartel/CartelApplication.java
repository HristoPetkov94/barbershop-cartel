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

@SpringBootApplication
public class CartelApplication {

    public static void main(String[] args) {
        SpringApplication.run(CartelApplication.class, args);
    }

    @Bean
    CommandLineRunner init(JwtUserDetailsService userService, BarberRepository barberRepository, ServiceRepository serviceRepository) {
        return  args -> {

            UserModel user = new UserModel();

            user.setEmail("admin@cartel.bg");
            user.setPassword("123");

            userService.save(user);

            BarberEntity barber1 = new BarberEntity();

            barber1.setFirstName("Пламен");
            barber1.setLastName("Маринов");
            barber1.setDescription("Инженер-Архитектът под чиито надзор се изпълнява този проект.");

            BarberEntity barber2 = new BarberEntity();

            barber2.setFirstName("Христо");
            barber2.setLastName("Петков");
            barber2.setDescription("Инженер-Предприемач, който ще доведе до край този проект.");

            barberRepository.save(barber1);
            barberRepository.save(barber2);

            ServiceEntity service1 = new ServiceEntity();

            service1.setServiceType("Подстригване / Haircurt");
            service1.setDescription("Модерна прическа и стил на мъжете от нашите професионални Барбъри / Modern man's haircut and styling from our professional Barbers");
            service1.setDuration(30);
            service1.setPrice(15);

            ServiceEntity service2 = new ServiceEntity();

            service2.setServiceType("Комплекс / Complex");
            service2.setDescription("Подстригване и стайлинг, корекция на брадата Ви. / Haircut and Styling, correction of your beard");
            service2.setDuration(60);
            service2.setPrice(23);

            serviceRepository.save(service1);
            serviceRepository.save(service2);
        };
    }
}
