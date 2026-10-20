package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.entity.EmailOtp;
import com.braintrain.mvp.repository.EmailOtpRepository;
import com.braintrain.mvp.service.EmailService;
import com.braintrain.mvp.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private static final Logger log =
            LoggerFactory.getLogger(OtpServiceImpl.class);

    private static final SecureRandom RANDOM = new SecureRandom();

    private final EmailOtpRepository otpRepository;
    private final EmailService emailService;

    @Override
    public void sendOtp(String email) {

        log.debug("OTP requested for email: {}", email);

        try {

            // Generate 6-digit OTP
            String otp =
                    String.valueOf(
                            100000 +
                            RANDOM.nextInt(900000)
                    );

            // Create OTP entity
            EmailOtp emailOtp = new EmailOtp();

            emailOtp.setEmail(email);
            emailOtp.setOtp(otp);
            emailOtp.setVerified(false);

            emailOtp.setExpiryTime(
                    LocalDateTime.now()
                            .plusMinutes(10)
            );

            otpRepository.save(emailOtp);

            emailService.sendOtpEmail(
                    email,
                    otp
            );

            log.info("OTP email sent successfully to {}", email);

        } catch (Exception e) {

            log.error("Failed to send OTP email to {}", email, e);

            throw new RuntimeException(
                    "Failed to send OTP",
                    e
            );
        }
    }

    @Override
    public boolean verifyOtp(
            String email,
            String otp
    ) {

        EmailOtp emailOtp =
                otpRepository
                        .findTopByEmailOrderByIdDesc(
                                email
                        )
                        .orElse(null);

        if (emailOtp == null) {
            return false;
        }

        // OTP match
        if (!emailOtp.getOtp().equals(otp)) {
            return false;
        }

        // OTP expiry
        if (
                emailOtp
                        .getExpiryTime()
                        .isBefore(LocalDateTime.now())
        ) {
            return false;
        }

        // Mark verified
        emailOtp.setVerified(true);

        otpRepository.save(emailOtp);

        return true;
    }
}
