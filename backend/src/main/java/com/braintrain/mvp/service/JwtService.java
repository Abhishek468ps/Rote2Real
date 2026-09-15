package com.braintrain.mvp.service;

import com.braintrain.mvp.entity.User;

public interface JwtService {

    /**
     * Generate JWT token for authenticated user.
     */
    String generateToken(User user);

    /**
     * Extract email from JWT token.
     */
    String extractEmail(String token);

    /**
     * Check whether JWT token belongs to the given user
     * and has not expired.
     */
    boolean validateToken(
            String token,
            User user
    );

    /**
     * Check token expiry.
     */
    boolean isTokenExpired(
            String token
    );
} 