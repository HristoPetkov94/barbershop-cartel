package com.barbershop.cartel;

import com.barbershop.cartel.security.models.UserModel;
import com.barbershop.cartel.security.service.JwtUserDetailsService;
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
    CommandLineRunner init(JwtUserDetailsService userService) {
        return  args -> {
            UserModel user = new UserModel();

            user.setEmail("dummy@abv.bg");
            user.setPassword("123");
            user.setFirstName("patrick");
            user.setLastName("patrick");

            userService.save(user);
        };
    }

}
