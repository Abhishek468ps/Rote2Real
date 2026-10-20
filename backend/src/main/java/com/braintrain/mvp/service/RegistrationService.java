package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.request.RegisterRequest;
import com.braintrain.mvp.dto.response.RegistrationResponse;

public interface RegistrationService {

    RegistrationResponse register(
            RegisterRequest request
    );
}

