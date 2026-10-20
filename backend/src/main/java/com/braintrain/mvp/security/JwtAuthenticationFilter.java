package com.braintrain.mvp.security;

import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.repository.UserRepository;
import com.braintrain.mvp.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private static final Logger log =
            LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtService jwtService;

    private final UserDetailsService userDetailsService;

    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getServletPath();

        if (
                path.startsWith("/api/auth/")
                        || path.startsWith("/swagger-ui")
                        || path.startsWith("/v3/api-docs")
        ) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader =
                request.getHeader("Authorization");

        if (
                authHeader == null
                        || !authHeader.startsWith("Bearer ")
        ) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt =
                authHeader.substring(7);

        try {

            String email =
                    jwtService.extractEmail(jwt);

            if (
                    email != null
                            && SecurityContextHolder
                            .getContext()
                            .getAuthentication() == null
            ) {

                User user =
                        userRepository
                                .findByEmail(email)
                                .orElse(null);

                if (user != null
                        && jwtService.validateToken(jwt, user)) {

                    UserDetails userDetails =
                            userDetailsService
                                    .loadUserByUsername(email);

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authentication);

                    if (
                            user.getLastSeen() == null
                                    || user.getLastSeen().isBefore(
                                    LocalDateTime.now().minusMinutes(1)
                            )
                    ) {

                        user.setLastSeen(LocalDateTime.now());

                        userRepository.save(user);
                    }

                    if (log.isDebugEnabled()) {
                        log.debug(
                                "JWT authenticated: {} | role: {}",
                                email,
                                user.getRole()
                        );
                    }
                } else if (log.isDebugEnabled()) {
                    log.debug(
                            "JWT invalid or expired for: {}",
                            email
                    );
                }
            }

        } catch (Exception ex) {

            // An invalid/expired/tampered token must never break the
            // request: it simply continues unauthenticated.
            if (log.isDebugEnabled()) {
                log.debug(
                        "JWT authentication failed: {} - {}",
                        ex.getClass().getSimpleName(),
                        ex.getMessage()
                );
            }
        }

        filterChain.doFilter(request, response);
    }
}
