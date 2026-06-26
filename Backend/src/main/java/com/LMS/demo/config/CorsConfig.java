package com.LMS.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${frontend.url}")
    private String frontendUrl;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        List<String> allowedOrigins = new ArrayList<>();
        if (frontendUrl != null) {
            for (String origin : frontendUrl.split(",")) {
                String cleanOrigin = origin.trim();
                // Strip quotes if they exist
                if (cleanOrigin.startsWith("\"") && cleanOrigin.endsWith("\"")) {
                    cleanOrigin = cleanOrigin.substring(1, cleanOrigin.length() - 1);
                }
                if (cleanOrigin.startsWith("'") && cleanOrigin.endsWith("'")) {
                    cleanOrigin = cleanOrigin.substring(1, cleanOrigin.length() - 1);
                }
                // Strip trailing slash
                if (cleanOrigin.endsWith("/")) {
                    cleanOrigin = cleanOrigin.substring(0, cleanOrigin.length() - 1);
                }
                // Strip carriage returns (\r)
                cleanOrigin = cleanOrigin.replace("\r", "");

                if (!cleanOrigin.isEmpty()) {
                    allowedOrigins.add(cleanOrigin);
                }
            }
        }

        configuration.setAllowedOrigins(allowedOrigins);

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setExposedHeaders(
                List.of(
                        "Authorization"
                )
                
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}

