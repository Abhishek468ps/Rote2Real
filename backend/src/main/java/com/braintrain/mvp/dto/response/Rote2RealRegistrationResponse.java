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
    private String universityName;
    private String courseDegree;
    private String yearOfStudy;
    private String track;
    private Boolean isInternational;
    private Long paymentAmountMinor;
    private String paymentCurrency;
    private String razorpayOrderId;
    private String razorpayKeyId;
    private String paymentStatus;
    private LocalDateTime registeredAt;
    private String message;
}
