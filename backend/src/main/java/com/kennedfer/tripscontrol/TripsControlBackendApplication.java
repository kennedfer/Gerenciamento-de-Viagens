package com.kennedfer.tripscontrol;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class TripsControlBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TripsControlBackendApplication.class, args);
	}

}
