package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.request.LoginRequest;
import com.braintrain.mvp.dto.request.RegisterRequest;
import com.braintrain.mvp.dto.response.RegistrationResponse;
import com.braintrain.mvp.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.braintrain.mvp.dto.request.SendOtpRequest;
import com.braintrain.mvp.dto.request.VerifyLoginOtpRequest;
import com.braintrain.mvp.dto.request.VerifyOtpRequest;
import com.braintrain.mvp.service.OtpService;
import jakarta.validation.Valid;
import com.braintrain.mvp.dto.response.LoginResponse;
import com.braintrain.mvp.service.AuthService;
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(
    origins = {
        "http://localhost:3000",
        "https://braintrainllp.in",
        "https://www.braintrainllp.in"
    }
)
public class AuthController {

    private final RegistrationService registrationService;
    private final OtpService otpService;
    private final AuthService authService;

    @PostMapping("/register")
public ResponseEntity<RegistrationResponse> register(
        @Valid @RequestBody RegisterRequest request
) {
        System.out.println("Register API Hit");
    return ResponseEntity.ok(
            registrationService.register(request)
    );
}


     @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(
            @RequestBody
            SendOtpRequest request
    ) {

        otpService.sendOtp(
                request.getEmail()
        );

        return ResponseEntity.ok(
                "OTP sent successfully"
        );
    }

     @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(
            @RequestBody
            VerifyOtpRequest request
    ) {

        boolean verified =
                otpService.verifyOtp(
                        request.getEmail(),
                        request.getOtp()
                );

        if (!verified) {
            return ResponseEntity
                    .badRequest()
                    .body("Invalid OTP");
        }

        return ResponseEntity.ok(
                "OTP verified successfully"
        );
    }

    @PostMapping("/login/send-otp")
public ResponseEntity<?> sendLoginOtp(
        @RequestBody LoginRequest request
) {

    authService.sendLoginOtp(request);

    return ResponseEntity.ok(
            "OTP sent successfully."
    );
}

@PostMapping("/login/verify-otp")
public ResponseEntity<LoginResponse> verifyLoginOtp(
        @RequestBody VerifyLoginOtpRequest request
) {

    return ResponseEntity.ok(
            authService.verifyLoginOtp(request)
    );
}

@GetMapping("/test")
public String test() {
    return "OK";
}
}
