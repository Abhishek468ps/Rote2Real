package com.braintrain.mvp.config;

import com.braintrain.mvp.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // ==============================
    // Password Encoder
    // ==============================
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ==============================
    // CORS Configuration
    // ==============================
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(
                "https://braintrainllp.in",
                "https://www.braintrainllp.in",
                "http://localhost:3000"
        ));

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of("*"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    // ==============================
    // Security Filter Chain
    // ==============================
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // Disable CSRF because API uses JWT
                .csrf(csrf -> csrf.disable())

                // Enable CORS
                .cors(Customizer.withDefaults())

                // Stateless JWT authentication
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // ==============================
                // Authorization Rules
                // ==============================
                .authorizeHttpRequests(auth -> auth

                        // Root URL
                        .requestMatchers(
                                "/",
                                "/index.html"
                        ).permitAll()

                        // Swagger
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/v3/api-docs.yaml"
                        ).permitAll()

                        // Authentication
                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()

                        // Public APIs
                        .requestMatchers(
                                "/api/public/**"
                        ).permitAll()

                        // Files
                        .requestMatchers(
                                "/api/files/**"
                        ).permitAll()

                        // Downloads
                        .requestMatchers(
                                "/api/downloads/**"
                        ).permitAll()

                        // Public MVP domains
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/mvp-domains/active"
                        ).permitAll()

                        // Error endpoint
                        .requestMatchers(
                                "/error"
                        ).permitAll()

                        // Community
                        .requestMatchers(
                                "/api/community/**"
                        ).authenticated()

                        // Admin
                        .requestMatchers(
                                "/api/admin/**"
                        ).hasRole("ADMIN")

                        // Student
                        .requestMatchers(
                                "/api/student/**"
                        ).hasRole("STUDENT")

                        .requestMatchers(
                                "/api/mvps/**"
                        ).hasRole("STUDENT")

                        .requestMatchers(
                                "/api/mvp/enrollments/**"
                        ).hasRole("STUDENT")

                        .requestMatchers(
                                "/api/mvp/workspace/**"
                        ).hasRole("STUDENT")

                        // Mentor
                        .requestMatchers(
                                "/api/mentor/**"
                        ).hasRole("MENTOR")

                        // Trainer
                        .requestMatchers(
                                "/api/trainer/**"
                        ).hasRole("TRAINER")

                        // Recruiter
                        .requestMatchers(
                                "/api/recruiter/**"
                        ).hasRole("RECRUITER")

                        // Company
                        .requestMatchers(
                                "/api/company/**"
                        ).hasRole("COMPANY")

                        // Institution
                        .requestMatchers(
                                "/api/institution/**"
                        ).hasRole("INSTITUTION")

                        // Doctor
                        .requestMatchers(
                                "/api/doctor/**"
                        ).hasRole("DOCTOR")

                        // Lawyer
                        .requestMatchers(
                                "/api/lawyer/**"
                        ).hasRole("LAWYER")

                        // Judge
                        .requestMatchers(
                                "/api/judge/**"
                        ).hasRole("JUDGE")

                        // Viewer
                        .requestMatchers(
                                "/api/viewer/**"
                        ).hasRole("VIEWER")

                        // Everything else requires authentication
                        .anyRequest()
                        .authenticated()
                )

                // JWT Filter
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    // ==============================
    // Authentication Manager
    // ==============================
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration.getAuthenticationManager();
    }
}
