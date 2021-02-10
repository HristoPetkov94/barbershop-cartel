package com.barbershop.cartel;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.repository.BarberRepository;
import com.barbershop.cartel.security.models.UserModel;
import com.barbershop.cartel.security.service.JwtUserDetailsService;
import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.utils.PictureUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@SpringBootApplication
public class CartelApplication implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(CartelApplication.class, args);
    }


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/","classpath:/images/")
                .setCachePeriod(0);
    }

    @Bean
    CommandLineRunner init(JwtUserDetailsService userService, BarberRepository barberRepository) {
        return args -> {

            UserModel user = new UserModel();

            user.setEmail("admin@cartel.bg");
            user.setPassword("123");

            userService.save(user);

            BarberEntity barber1 = createBarber1();
            BarberEntity barber2 = createBarber2();

            barberRepository.save(barber1);
            barberRepository.save(barber2);


        };
    }

    public static BarberEntity createBarber1() {

        BarberEntity barber = new BarberEntity();

        barber.setFirstName("Пламен");
        barber.setLastName("Маринов");
        barber.setDescription("Инженер-Архитектът под чиито надзор се изпълнява този проект.");
        barber.setPicture(PictureUtils.getDefaultPicture());

        List<ServiceEntity> services = new ArrayList<>();

        services.add(createService1());
        services.add(createService2());
        services.add(createService3());

        barber.setServices(services);

        return barber;
    }

    public static BarberEntity createBarber2() {

        BarberEntity barber = new BarberEntity();

        barber.setFirstName("Христо");
        barber.setLastName("Петков");
        barber.setDescription("Инженер-Предприемач, който ще доведе до край този проект.");
        barber.setPicture(PictureUtils.getDefaultPicture());

        List<ServiceEntity> services = new ArrayList<>();

        services.add(createService4());
        services.add(createService5());

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
