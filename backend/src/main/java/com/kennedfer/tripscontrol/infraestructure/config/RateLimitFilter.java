package com.kennedfer.tripscontrol.infraestructure.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kennedfer.tripscontrol.dto.response.ErrorResponseDto;
import io.github.bucket4j.Bucket;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@AllArgsConstructor
public class RateLimitFilter implements Filter {

    private final Bucket bucket;

    private boolean isSwaggerRequest(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/v3/api-docs") || path.startsWith("/swagger-ui");
    }

    private void sendTooManyRequestError(ServletResponse response) throws IOException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.setStatus(429);
        httpResponse.setContentType("application/json");

        ErrorResponseDto error = new ErrorResponseDto("TOO_MANY_REQUESTS",
                "Você excedeu o limite de requisições. Tente novamente mais tarde.");

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(error);

        httpResponse.getWriter().write(json);
    }

    @SneakyThrows
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;

        if (isSwaggerRequest(httpRequest)) {
            chain.doFilter(request, response);
            return;
        }

        if (bucket.tryConsume(1)) {
            chain.doFilter(request, response);
        } else {
            sendTooManyRequestError(response);
        }
    }
}
