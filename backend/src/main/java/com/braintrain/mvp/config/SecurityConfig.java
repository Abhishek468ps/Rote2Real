package com.braintrain.mvp.config;

import com.braintrain.mvp.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
import org.springframework.http.HttpMethod;
@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

      @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                .csrf(csrf -> csrf.disable())

                .cors(Customizer.withDefaults())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

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

                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/public/**"
                        ).permitAll()

                       .requestMatchers(
                        "/api/files/**"
                ).permitAll()

                .requestMatchers(
        "/api/downloads/**"
).permitAll()

.requestMatchers(
    HttpMethod.GET,
    "/api/mvp-domains/active"
).permitAll()

.requestMatchers("/error").permitAll()

.requestMatchers(
        "/api/community/**"
).authenticated()
                        .requestMatchers(
                                "/api/admin/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                "/api/student/**"
                        ).hasRole("STUDENT")

   .requestMatchers("/api/mvps/**")
.hasRole("STUDENT")

.requestMatchers("/api/mvp/enrollments/**")
.hasRole("STUDENT")

.requestMatchers("/api/mvp/workspace/**").hasRole("STUDENT")

                        .requestMatchers(
                                "/api/mentor/**"
                        ).hasRole("MENTOR")

                        .requestMatchers(
                                "/api/trainer/**"
                        ).hasRole("TRAINER")

                        .requestMatchers(
                                "/api/recruiter/**"
                        ).hasRole("RECRUITER")

                        .requestMatchers(
                                "/api/company/**"
                        ).hasRole("COMPANY")

                        .requestMatchers(
                                "/api/institution/**"
                        ).hasRole("INSTITUTION")

                        .requestMatchers(
                                "/api/doctor/**"
                        ).hasRole("DOCTOR")

                        .requestMatchers(
                                "/api/lawyer/**"
                        ).hasRole("LAWYER")

                        .requestMatchers(
                                "/api/judge/**"
                        ).hasRole("JUDGE")

                        .requestMatchers(
                                "/api/viewer/**"
                        ).hasRole("VIEWER")

                        .anyRequest()
                        .authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

  

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration.getAuthenticationManager();

    }

}
