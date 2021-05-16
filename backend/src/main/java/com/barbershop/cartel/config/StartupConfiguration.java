package com.barbershop.cartel.config;

import com.barbershop.cartel.general.config.info.entity.GeneralConfigurationEntity;
import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import com.barbershop.cartel.general.config.info.repository.GeneralConfigurationRepository;
import com.barbershop.cartel.general.config.socialmedia.entity.SocialMediaEntity;
import com.barbershop.cartel.general.config.socialmedia.repository.SocialMediaRepository;
import com.barbershop.cartel.notifications.email.entity.EmailDetailEntity;
import com.barbershop.cartel.notifications.email.enums.EmailTypeEnum;
import com.barbershop.cartel.notifications.email.repository.EmailDetailRepository;
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

    @Autowired
    @Lazy
    private GeneralConfigurationRepository generalConfigurationRepository;

    @Autowired
    @Lazy
    private EmailDetailRepository emailDetailRepository;

    @Autowired
    @Lazy
    private SocialMediaRepository socialMediaRepository;

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
        generalConfigurationInitialization();
        emailConfigurationInitialization();
        socialMediaInitialization();
    }

    private void generalConfigurationInitialization() {
        GeneralConfigurationEntity configurationEN = new GeneralConfigurationEntity();
        configurationEN.setLanguage(LanguageEnum.en);

        GeneralConfigurationEntity configurationBG = new GeneralConfigurationEntity();
        configurationBG.setLanguage(LanguageEnum.bg);

        generalConfigurationRepository.save(configurationEN);
        generalConfigurationRepository.save(configurationBG);
    }

    private void emailConfigurationInitialization() {
        EmailDetailEntity bookingEmailBG = new EmailDetailEntity();

        bookingEmailBG.setFrom("admin@cartel.bg");
        bookingEmailBG.setEmailType(EmailTypeEnum.BOOKING_EMAIL_TYPE);
        bookingEmailBG.setLanguage(LanguageEnum.bg);

        emailDetailRepository.save(bookingEmailBG);

        EmailDetailEntity forgotPasswordEmailBG = new EmailDetailEntity();

        forgotPasswordEmailBG.setFrom("admin@cartel.bg");
        forgotPasswordEmailBG.setEmailType(EmailTypeEnum.FORGOT_PASSWORD_TYPE);
        forgotPasswordEmailBG.setLanguage(LanguageEnum.bg);

        emailDetailRepository.save(forgotPasswordEmailBG);

        EmailDetailEntity bookingEmailEN = new EmailDetailEntity();

        bookingEmailEN.setFrom("admin@cartel.bg");
        bookingEmailEN.setEmailType(EmailTypeEnum.BOOKING_EMAIL_TYPE);
        bookingEmailEN.setLanguage(LanguageEnum.en);

        emailDetailRepository.save(bookingEmailEN);

        EmailDetailEntity forgotPasswordEmailEN = new EmailDetailEntity();

        forgotPasswordEmailEN.setFrom("admin@cartel.bg");
        forgotPasswordEmailEN.setEmailType(EmailTypeEnum.FORGOT_PASSWORD_TYPE);
        forgotPasswordEmailEN.setLanguage(LanguageEnum.en);

        emailDetailRepository.save(forgotPasswordEmailEN);
    }

    private void socialMediaInitialization() {
        socialMediaRepository.save(new SocialMediaEntity());
    }

}
