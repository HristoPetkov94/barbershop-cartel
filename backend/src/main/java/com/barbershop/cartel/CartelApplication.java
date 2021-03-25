package com.barbershop.cartel;

import com.barbershop.cartel.assignments.entity.AssignmentEntity;
import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.assignments.repository.AssignmentRepository;
import com.barbershop.cartel.barbers.repository.BarberRepository;
import com.barbershop.cartel.services.repository.ServiceRepository;
import com.barbershop.cartel.security.models.UserModel;
import com.barbershop.cartel.security.service.JwtUserDetailsService;
import com.barbershop.cartel.services.entity.ServiceEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class CartelApplication implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(CartelApplication.class, args);
    }


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/", "classpath:/images/")
                .setCachePeriod(0);
    }

    @Value("${server.servlet.context-path}/images/default-profile-image.png")
    private String defaultProfileImageUrl;

    @Value("${server.servlet.context-path}/images/default-service-image.png")
    private String defaultServiceImageUrl;

    @Bean
    CommandLineRunner init(JwtUserDetailsService userService,
                           BarberRepository barberRepository,
                           ServiceRepository serviceRepository,
                           AssignmentRepository assignmentRepository) {
        return args -> {

            UserModel user = new UserModel();

            user.setEmail("admin@cartel.bg");
            user.setPassword("123");

            userService.save(user);

            BarberEntity barber1 = createBarber1();
            BarberEntity barber2 = createBarber2();

            barberRepository.save(barber1);
            barberRepository.save(barber2);


            ServiceEntity service1 = createService1();
            ServiceEntity service2 = createService2();
            ServiceEntity service3 = createService3();
            ServiceEntity service4 = createService4();

            serviceRepository.save(service1);
            serviceRepository.save(service2);
            serviceRepository.save(service3);
            serviceRepository.save(service4);

            AssignmentEntity assignment1 = assignment1(barber1, service1);
            AssignmentEntity assignment2 = assignment2(barber1, service2);
            AssignmentEntity assignment3 = assignment3(barber2, service3);
            AssignmentEntity assignment4 = assignment4(barber2, service4);
            AssignmentEntity assignment5 = assignment5(barber2, service2);

            assignmentRepository.save(assignment1);
            assignmentRepository.save(assignment2);
            assignmentRepository.save(assignment3);
            assignmentRepository.save(assignment4);
            assignmentRepository.save(assignment5);
        };
    }

    public BarberEntity createBarber1() {

        BarberEntity barber = new BarberEntity();

        barber.setFirstName("Пламен");
        barber.setLastName("Маринов");
        barber.setDescription("Инженер-Архитектът под чиито надзор се изпълнява този проект.");
        barber.setPicture(defaultProfileImageUrl);

        return barber;
    }

    public BarberEntity createBarber2() {

        BarberEntity barber = new BarberEntity();

        barber.setFirstName("Христо");
        barber.setLastName("Петков");
        barber.setDescription("Инженер-Предприемач, който ще доведе до край този проект.");
        barber.setPicture(defaultProfileImageUrl);

        return barber;
    }

    public ServiceEntity createService1() {

        ServiceEntity service = new ServiceEntity();

        service.setServiceTitle("Подстригване / Haircurt");
        service.setDescription("Модерна прическа и стил на мъжете от нашите професионални Барбъри / Modern man's haircut and styling from our professional Barbers");
        service.setPicture(defaultServiceImageUrl);

        return service;
    }

    public ServiceEntity createService2() {

        ServiceEntity service = new ServiceEntity();

        service.setServiceTitle("Комплекс / Complex");
        service.setDescription("Подстригване и стайлинг, корекция на брадата Ви. / Haircut and Styling, correction of your beard");
        service.setPicture(defaultServiceImageUrl);

        return service;
    }

    public ServiceEntity createService3() {

        ServiceEntity service = new ServiceEntity();

        service.setServiceTitle("Детско постригване / Children's haircut");
        service.setDescription("Професионална прическа за деца до 5год. / Professional hairstyle for children up to 5 years\n");
        service.setPicture(defaultServiceImageUrl);

        return service;
    }

    public ServiceEntity createService4() {

        ServiceEntity service = new ServiceEntity();

        service.setServiceTitle("Beard / Shaving - Брада / Бръснене");
        service.setDescription("Професионален дизайн на брада или бръснене. / Professional beard design or a nice shave.");
        service.setPicture(defaultServiceImageUrl);

        return service;
    }

    public AssignmentEntity assignment1(BarberEntity barber, ServiceEntity service) {

        AssignmentEntity assignment = new AssignmentEntity();

        assignment.setDuration(30);
        assignment.setPrice(15);
        assignment.setBarber(barber);
        assignment.setService(service);

        return assignment;
    }

    public AssignmentEntity assignment2(BarberEntity barber, ServiceEntity service) {

        AssignmentEntity assignment = new AssignmentEntity();

        assignment.setDuration(60);
        assignment.setPrice(23);
        assignment.setBarber(barber);
        assignment.setService(service);

        return assignment;
    }

    public AssignmentEntity assignment3(BarberEntity barber, ServiceEntity service) {

        AssignmentEntity assignment = new AssignmentEntity();

        assignment.setDuration(30);
        assignment.setPrice(10);
        assignment.setBarber(barber);
        assignment.setService(service);

        return assignment;
    }

    public AssignmentEntity assignment4(BarberEntity barber, ServiceEntity service) {

        AssignmentEntity assignment = new AssignmentEntity();

        assignment.setDuration(30);
        assignment.setPrice(15);
        assignment.setBarber(barber);
        assignment.setService(service);

        return assignment;
    }

    public AssignmentEntity assignment5(BarberEntity barber, ServiceEntity service) {

        AssignmentEntity assignment = new AssignmentEntity();

        assignment.setDuration(60);
        assignment.setPrice(23);
        assignment.setBarber(barber);
        assignment.setService(service);

        return assignment;
    }
}
