package com.barbershop.cartel;

import com.barbershop.cartel.general.config.messages.entity.GeneralConfigurationEntity;
import com.barbershop.cartel.general.config.messages.enums.LanguageEnum;
import com.barbershop.cartel.general.config.messages.repository.GeneralConfigurationRepository;
import liquibase.integration.spring.SpringLiquibase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.sql.DataSource;

@SpringBootApplication
public class CartelApplication implements WebMvcConfigurer {
    @Autowired
    private DataSource dataSource;

    @Autowired
    private GeneralConfigurationRepository generalConfigurationRepository;

    @Bean
    @Profile("prod")
    public SpringLiquibase liquibase() {
        SpringLiquibase liquibase = new SpringLiquibase();
        liquibase.setDataSource(dataSource);
        liquibase.setChangeLog("classpath:liquibase-changeLog.xml");
        return liquibase;
    }

    @Bean
    @Profile("dev")
    public void addConfig() {
        GeneralConfigurationEntity configurationEN = new GeneralConfigurationEntity();
        configurationEN.setLanguage(LanguageEnum.en);

        GeneralConfigurationEntity configurationBG = new GeneralConfigurationEntity();
        configurationBG.setLanguage(LanguageEnum.bg);

        generalConfigurationRepository.save(configurationEN);
        generalConfigurationRepository.save(configurationBG);
    }

    public static void main(String[] args) {
        SpringApplication.run(CartelApplication.class, args);
    }
}
