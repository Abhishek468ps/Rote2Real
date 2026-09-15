package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.request.CreateMvpEnrollmentRequest;
import com.braintrain.mvp.dto.response.MvpEnrollmentResponse;

import java.util.List;

public interface MvpEnrollmentService {

    MvpEnrollmentResponse enroll(
            Long userId,
            CreateMvpEnrollmentRequest request
    );

    List<MvpEnrollmentResponse> getMyEnrollments(
            Long userId
    );

    MvpEnrollmentResponse getMyEnrollment(
            Long userId,
            Long enrollmentId
    );

    MvpEnrollmentResponse startEnrollment(
            Long userId,
            Long enrollmentId
    );

    MvpEnrollmentResponse activateAfterPayment(
        Long enrollmentId
);
}