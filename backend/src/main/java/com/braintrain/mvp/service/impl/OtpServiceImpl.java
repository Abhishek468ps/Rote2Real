package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.entity.EmailOtp;
import com.braintrain.mvp.repository.EmailOtpRepository;
import com.braintrain.mvp.service.EmailService;
import com.braintrain.mvp.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private final EmailOtpRepository otpRepository;
    private final EmailService emailService;

    @Override
    public void sendOtp(String email) {

        System.out.println("========== SEND OTP START ==========");
        System.out.println("OTP requested for email: " + email);

        try {

            // Generate 6-digit OTP
            String otp =
                    String.valueOf(
                            100000 +
                            new Random().nextInt(900000)
                    );

            System.out.println(
                    "OTP generated successfully"
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

            // Save OTP
            System.out.println(
                    "Saving OTP to database..."
            );

            otpRepository.save(emailOtp);

            System.out.println(
                    "OTP saved successfully"
            );

            // Send email
            System.out.println(
                    "Sending OTP email..."
            );

            emailService.sendOtpEmail(
                    email,
                    otp
            );

            System.out.println(
                    "OTP email sent successfully"
            );

            System.out.println(
                    "========== SEND OTP END =========="
            );

        } catch (Exception e) {

            System.err.println(
                    "========== OTP SEND FAILED =========="
            );

            System.err.println(
                    "Email: " + email
            );

            e.printStackTrace();

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
