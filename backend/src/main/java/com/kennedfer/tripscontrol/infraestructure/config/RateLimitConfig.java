package com.kennedfer.tripscontrol.infraestructure.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class RateLimitConfig {
    @Bean
    public Bucket bucket(){
        Bandwidth limit = Bandwidth.classic(5, Refill.greedy(100, Duration.ofMinutes(1)));
        return Bucket4j.builder().addLimit(limit).build();
    }
}
