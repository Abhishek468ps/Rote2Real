package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.entity.EmailOtp;
import com.braintrain.mvp.repository.EmailOtpRepository;
import com.braintrain.mvp.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;
import com.braintrain.mvp.service.EmailService;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl
        implements OtpService {

    private final EmailOtpRepository
            otpRepository;

    private final EmailService emailService;        

    @Override
    public void sendOtp(
            String email
    ) {

        String otp =
                String.valueOf(
                        100000 +
                        new Random()
                                .nextInt(
                                        900000
                                )
                );

        EmailOtp emailOtp =
                new EmailOtp();

        emailOtp.setEmail(email);
        emailOtp.setOtp(otp);
        emailOtp.setVerified(false);
        emailOtp.setExpiryTime(
                LocalDateTime.now()
                        .plusMinutes(10)
        );

        otpRepository.save(
                emailOtp
        );

        System.out.println(
                "OTP = " + otp
        );

        emailService.sendOtpEmail(
        email,
        otp
);
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

        if (
                emailOtp == null
        ) {
            return false;
        }

      // OTP match check
    if (!emailOtp.getOtp().equals(otp)) {
        return false;
    }

    // Expiry check
    if (emailOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
        return false;
    }

    // Mark email as verified
    emailOtp.setVerified(true);

    // Save updated record
    otpRepository.save(emailOtp);

    return true;
}
}
