package com.braintrain.mvp.dto.request;

import jakarta.validation.constraints.NotNull;

public class CreateMvpPaymentRequest {

    @NotNull
    private Long enrollmentId;

    public Long getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(Long enrollmentId) {
        this.enrollmentId = enrollmentId;
    }
}