package com.braintrain.mvp.service;
import com.braintrain.mvp.entity.User;
public interface EmailService {

    void sendOtpEmail(
            String email,
            String otp
    );

      void sendWelcomeEmail(
            User user
    );
}
