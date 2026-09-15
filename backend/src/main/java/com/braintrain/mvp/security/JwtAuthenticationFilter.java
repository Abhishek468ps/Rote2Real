/*package com.braintrain.mvp.security;

import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.repository.UserRepository;
import com.braintrain.mvp.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

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

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);

        String email;

        try {
            email = jwtService.extractEmail(jwt);
        } catch (Exception ex) {
            filterChain.doFilter(request, response);
            return;
        }

        if (email != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(email);

            User user =
                    userRepository
                            .findByEmail(email)
                            .orElse(null);

            if (user != null &&
                    jwtService.validateToken(jwt, user)) {

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

                    System.out.println(
        "AUTHENTICATED USER: " +
        authentication.getName()
);

System.out.println(
        "AUTHORITIES: " +
        authentication.getAuthorities()
);    
            }
        }

        filterChain.doFilter(request, response);
    }
}
*/


package com.braintrain.mvp.security;

import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.repository.UserRepository;
import com.braintrain.mvp.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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

        System.out.println("\n========== JWT FILTER ==========");
    System.out.println("Request URI: " + request.getRequestURI());
    System.out.println("Request Method: " + request.getMethod());

        /*
         * Public endpoints
         */
        if (
                path.startsWith("/api/auth/")
                        || path.startsWith("/swagger-ui")
                        || path.startsWith("/v3/api-docs")
        ) {
                System.out.println("Public endpoint. JWT filter skipped.");
            filterChain.doFilter(request, response);
            return;
        }

        /*
         * Read Authorization header
         */
        final String authHeader =
                request.getHeader("Authorization");

                  System.out.println(
            "Authorization Header Present: "
                    + (authHeader != null)
    );

     if (authHeader == null) {
        System.out.println("Authorization Header: NULL");
    } else {
        System.out.println(
                "Authorization Header starts with Bearer: "
                        + authHeader.startsWith("Bearer ")
        );
    }

        if (
                authHeader == null
                        || !authHeader.startsWith("Bearer ")
        ) {
                 System.out.println(
                "No valid Bearer token. Continuing filter chain."
        );
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt =
                authHeader.substring(7);

        try {

            /*
             * Extract email from JWT
             */
            String email =
                    jwtService.extractEmail(jwt);

             System.out.println(
                "JWT Username / Email: " + email
        );        

            if (
                    email != null
                            && SecurityContextHolder
                            .getContext()
                            .getAuthentication() == null
            ) {

                /*
                 * Find user in database
                 */
                User user =
                        userRepository
                                .findByEmail(email)
                                .orElse(null);

                if (user != null) {

                    /*
                     * Validate JWT
                     */
                    boolean valid =
                            jwtService.validateToken(
                                    jwt,
                                    user
                            );
                         
                             System.out.println(
                        "JWT Valid: " + valid
                );

                    if (valid) {

                        UserDetails userDetails =
                                userDetailsService
                                        .loadUserByUsername(email);

                          System.out.println(
                            "UserDetails Username: "
                                    + userDetails.getUsername()
                    );

                    System.out.println(
                            "User Authorities: "
                                    + userDetails.getAuthorities()
                    );               

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

                                  // Update last seen
if (
        user.getLastSeen() == null
        || user.getLastSeen().isBefore(
                LocalDateTime.now().minusMinutes(1)
        )
) {

    user.setLastSeen(LocalDateTime.now());

    userRepository.save(user);
}

                        System.out.println(
                                "JWT AUTHENTICATED: "
                                        + email
                                        + " | ROLE: "
                                        + user.getRole()
                        );

                         System.out.println(
                            "SecurityContext Authentication: "
                                    + SecurityContextHolder
                                    .getContext()
                                    .getAuthentication()
                    );

                    System.out.println(
                            "SecurityContext Authorities: "
                                    + SecurityContextHolder
                                    .getContext()
                                    .getAuthentication()
                                    .getAuthorities()
                    );
                    } else {

                        System.out.println(
                                "JWT INVALID OR EXPIRED for: "
                                        + email
                        );
                    }
                } else {

                    System.out.println(
                            "USER NOT FOUND: "
                                    + email
                    );
                }
            }

            else {

            System.out.println(
                    "Email is null OR SecurityContext already authenticated."
            );
        }

        } catch (Exception ex) {

            /*
             * IMPORTANT:
             * Print the actual JWT error.
             */
            System.out.println(
                    "JWT AUTHENTICATION ERROR: "
                            + ex.getClass().getName()
            );

            System.out.println(
                    "JWT ERROR MESSAGE: "
                            + ex.getMessage()
            );
             ex.printStackTrace();
        }

        filterChain.doFilter(request, response);

        System.out.println(
            "========== JWT FILTER END ==========\n"
    );
    }
}

