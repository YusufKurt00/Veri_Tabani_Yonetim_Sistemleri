package com.eticaret.starter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = {"com.eticaret"})
@ComponentScan(basePackages = {"com.eticaret"})
@EntityScan(basePackages = {"com.eticaret"})
@SpringBootApplication
public class VtysApplication {

    public static void main(String[] args) {
        SpringApplication.run(VtysApplication.class, args);
    }

}
