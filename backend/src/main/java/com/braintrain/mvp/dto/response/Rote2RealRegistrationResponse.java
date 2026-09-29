package com.braintrain.mvp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rote2RealRegistrationResponse {

    private Long studentId;
    private String name;
    private String email;
    private String phone;
    private String country;
    private Boolean isInternational;
    private Long paymentAmountMinor;
    private String paymentCurrency;
    private String razorpayOrderId;
    private String razorpayKeyId;
    private String paymentStatus;
    private LocalDateTime registeredAt;
}
