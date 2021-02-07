package com.barbershop.cartel.security.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@Configuration
@PropertySource("classpath:git.properties")
public class GitInfo {
    @Value("${git.commit.id.full}")
    private String gitCommitId;

    @Value("${git.branch}")
    private String gitBranch;

    @Value("${git.build.time}")
    private String gitBuildTime;
}
