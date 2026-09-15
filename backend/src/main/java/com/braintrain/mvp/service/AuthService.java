package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.request.LoginRequest;
import com.braintrain.mvp.dto.request.VerifyLoginOtpRequest;
import com.braintrain.mvp.dto.response.LoginResponse;
import com.braintrain.mvp.dto.response.UserProfileResponse;
import org.springframework.security.core.Authentication;


public interface AuthService {

    void sendLoginOtp(LoginRequest request);

    LoginResponse verifyLoginOtp(
            VerifyLoginOtpRequest request
    );
    UserProfileResponse getCurrentUser(
            Authentication authentication
    );

}
