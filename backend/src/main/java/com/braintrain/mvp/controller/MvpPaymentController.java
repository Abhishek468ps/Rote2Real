package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.request.CreateMvpPaymentRequest;
import com.braintrain.mvp.dto.request.VerifyMvpPaymentRequest;
import com.braintrain.mvp.dto.response.MvpEnrollmentResponse;
import com.braintrain.mvp.dto.response.MvpPaymentOrderResponse;
import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.repository.UserRepository;
import com.braintrain.mvp.service.MvpPaymentService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mvp/payments")
@RequiredArgsConstructor
public class MvpPaymentController {

    private final MvpPaymentService paymentService;
    private final UserRepository userRepository;

    // ==========================================================
    // CREATE PAYMENT ORDER
    // ==========================================================

    @PostMapping("/create-order")
    public ResponseEntity<MvpPaymentOrderResponse> createOrder(
            Authentication authentication,
            @Valid @RequestBody CreateMvpPaymentRequest request
    ) {

        Long userId = extractUserId(authentication);

        return ResponseEntity.ok(
                paymentService.createOrder(
                        userId,
                        request
                )
        );
    }

    // ==========================================================
    // VERIFY PAYMENT
    // ==========================================================

    @PostMapping("/verify")
    public ResponseEntity<MvpEnrollmentResponse> verifyPayment(
            Authentication authentication,
            @Valid @RequestBody VerifyMvpPaymentRequest request
    ) {

        Long userId = extractUserId(authentication);

        return ResponseEntity.ok(
                paymentService.verifyPayment(
                        userId,
                        request
                )
        );
    }

    // ==========================================================
    // GET USER ID FROM JWT
    // ==========================================================

    private Long extractUserId(Authentication authentication) {

        if (authentication == null ||
                authentication.getName() == null ||
                authentication.getName().isBlank()) {

            throw new RuntimeException(
                    "Authenticated user could not be resolved"
            );
        }

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Authenticated user not found"
                        )
                );

        return user.getId();
    }
}