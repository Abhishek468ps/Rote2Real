package com.braintrain.mvp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;



@Getter
@Builder
@AllArgsConstructor
public class MvpPaymentOrderResponse {

    private Long enrollmentId;

    private String razorpayOrderId;

    private String razorpayKeyId;

    private Long amount;

    private String currency;

    private String mvpTitle;

    private String planName;
}
