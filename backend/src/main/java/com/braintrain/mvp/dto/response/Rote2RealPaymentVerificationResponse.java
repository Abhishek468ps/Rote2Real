package com.braintrain.mvp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rote2RealPaymentVerificationResponse {

    private Long studentId;
    private String email;
    private String paymentStatus;
    private String razorpayPaymentId;
    private boolean enrolled;
    private String message;
}
