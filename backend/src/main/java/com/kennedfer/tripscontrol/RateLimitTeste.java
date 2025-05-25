package com.kennedfer.tripscontrol;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

public class RateLimitTeste {
    public static void main(String[] args) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8080/api/v1/trips/hello";

        for (int i = 0; i < 100; i++) {
            try {
                ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
                System.out.println("Status: " + response.getStatusCode());
            } catch (HttpClientErrorException e) {
                System.out.println("Erro: " + e.toString());
            }
        }
    }
}
