package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.request.CreateMvpPaymentRequest;
import com.braintrain.mvp.dto.request.VerifyMvpPaymentRequest;
import com.braintrain.mvp.dto.response.MvpEnrollmentResponse;
import com.braintrain.mvp.dto.response.MvpPaymentOrderResponse;

public interface MvpPaymentService {

    MvpPaymentOrderResponse createOrder(
            Long userId,
            CreateMvpPaymentRequest request
    );

    MvpEnrollmentResponse verifyPayment(
            Long userId,
            VerifyMvpPaymentRequest request
    );
}
