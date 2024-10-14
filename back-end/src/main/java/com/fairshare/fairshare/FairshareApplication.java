package com.fairshare.fairshare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EnableJpaRepositories("com.fairshare.fairshare.repository")
@ComponentScan(basePackages = { "com.fairshare.fairshare" })
@EntityScan("com.fairshare.fairshare.model")
public class FairshareApplication {

	public static void main(String[] args) {
		SpringApplication.run(FairshareApplication.class, args);
		System.out.println("Hello World");
	}

}
