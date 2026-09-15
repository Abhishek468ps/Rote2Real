package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.dto.request.LoginRequest;
import com.braintrain.mvp.dto.request.VerifyLoginOtpRequest;
import com.braintrain.mvp.dto.response.LoginResponse;
import com.braintrain.mvp.dto.response.UserProfileResponse;
import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.repository.UserRepository;
import com.braintrain.mvp.service.AuthService;
import com.braintrain.mvp.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.braintrain.mvp.service.JwtService;
import org.springframework.security.core.Authentication;
@Service
@RequiredArgsConstructor
public class AuthServiceImpl
        implements AuthService {

    private final UserRepository userRepository;

    private final OtpService otpService;

    private final JwtService jwtService;

    @Override
    public void sendLoginOtp(
            LoginRequest request
    ) {

        User user =
                userRepository
                        .findByBraintrainIdAndEmail(
                                request.getBrainTrainId(),
                                request.getEmail()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Invalid Brain Train ID or Email."
                                )
                        );

        otpService.sendOtp(
                user.getEmail()
        );
    }

    @Override
    public LoginResponse verifyLoginOtp(
            VerifyLoginOtpRequest request
    ) {

        User user =
                userRepository
                        .findByBraintrainIdAndEmail(
                                request.getBrainTrainId(),
                                request.getEmail()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found."
                                )
                        );

        boolean verified =
                otpService.verifyOtp(
                        request.getEmail(),
                        request.getOtp()
                );

        if (!verified) {
            throw new RuntimeException(
                    "Invalid OTP."
            );
        }

        // JWT next step me generate karenge
       String token = jwtService.generateToken(user);

        return new LoginResponse(

                user.getId(),

                user.getBraintrainId(),

                user.getFullName(),

                user.getEmail(),

                user.getRole().name(),

                token,

                "Login Successful"

        );
    }

    @Override
public UserProfileResponse getCurrentUser(
        Authentication authentication
) {

    String email = authentication.getName();

    User user = userRepository
            .findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("User not found.")
            );

    return UserProfileResponse.builder()
            .id(user.getId())
            .fullName(user.getFullName())
            .email(user.getEmail())
            .role(user.getRole().name())
            .braintrainId(user.getBraintrainId())
            .emailVerified(user.isEmailVerified())
            .active(user.isActive())
            .wallet(user.getWallet())
            .xp(user.getXp())
            .profileImage(user.getProfileImage())
            .createdAt(
                user.getCreatedAt() != null
                        ? user.getCreatedAt().toString()
                        : null
        )
            .build();
}

}