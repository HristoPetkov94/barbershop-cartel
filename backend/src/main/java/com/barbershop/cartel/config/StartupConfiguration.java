package com.barbershop.cartel.config;

import com.barbershop.cartel.general.config.info.entity.GeneralConfigurationEntity;
import com.barbershop.cartel.general.config.info.repository.GeneralConfigurationRepository;
import liquibase.integration.spring.SpringLiquibase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

@Configuration
public class StartupConfiguration {

    @Autowired
    private DataSource dataSource;


    //TODO: check if  @Lazy is needed
    @Autowired
    @Lazy
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
        //TODO: fix imports on LanguageEnum
        GeneralConfigurationEntity configurationEN = new GeneralConfigurationEntity();
        configurationEN.setLanguage(com.barbershop.cartel.general.config.messages.enums.LanguageEnum.en);

        GeneralConfigurationEntity configurationBG = new GeneralConfigurationEntity();
        configurationBG.setLanguage(com.barbershop.cartel.general.config.messages.enums.LanguageEnum.bg);

        generalConfigurationRepository.save(configurationEN);
        generalConfigurationRepository.save(configurationBG);
    }
}
