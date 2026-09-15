package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.dto.request.CreateMvpPaymentRequest;
import com.braintrain.mvp.dto.request.VerifyMvpPaymentRequest;
import com.braintrain.mvp.dto.response.MvpEnrollmentResponse;
import com.braintrain.mvp.dto.response.MvpPaymentOrderResponse;
import com.braintrain.mvp.entity.MvpEnrollment;
import com.braintrain.mvp.enums.MvpEnrollmentStatus;
import com.braintrain.mvp.enums.MvpPaymentStatus;
import com.braintrain.mvp.repository.MvpEnrollmentRepository;
import com.braintrain.mvp.service.MvpPaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional
public class MvpPaymentServiceImpl
        implements MvpPaymentService {

    private final MvpEnrollmentRepository enrollmentRepository;
    private final MvpEnrollmentServiceImpl enrollmentService;

    private final RazorpayClient razorpayClient;

    @Value("${razorpay.key-id}")
    private String razorpayKeyId;

    // ==========================================================
    // CREATE RAZORPAY ORDER
    // ==========================================================

    @Override
    public MvpPaymentOrderResponse createOrder(
            Long userId,
            CreateMvpPaymentRequest request
    ) {

        MvpEnrollment enrollment =
                enrollmentRepository.findById(
                        request.getEnrollmentId()
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Enrollment not found"
                        )
                );

        // Security check
        if (!enrollment.getUser()
                .getId()
                .equals(userId)) {

            throw new RuntimeException(
                    "You are not allowed to pay for this enrollment"
            );
        }

        // Already paid
        if (enrollment.getPaymentStatus()
                == MvpPaymentStatus.PAID) {

            throw new RuntimeException(
                    "This enrollment is already paid"
            );
        }

        // Free plan
        if (enrollment.getPlan().isFree()
                || enrollment.getPlan()
                .getPrice()
                .signum() == 0) {

            throw new RuntimeException(
                    "Payment is not required for this plan"
            );
        }

        // Existing order can be reused
        if (enrollment.getRazorpayOrderId() != null
                && !enrollment
                .getRazorpayOrderId()
                .isBlank()) {

             BigDecimal existingPrice =
        enrollment.getPlan().getPrice();

long existingAmountInSmallestUnit =
        existingPrice
                .movePointRight(2)
                .longValueExact();           

            return MvpPaymentOrderResponse.builder()
                    .enrollmentId(enrollment.getId())
                    .razorpayOrderId(
                            enrollment.getRazorpayOrderId()
                    )
                    .razorpayKeyId(razorpayKeyId)
                    .amount(existingAmountInSmallestUnit)
                    .currency(enrollment.getPlan().getCurrency())
                    .mvpTitle(
                            enrollment.getMvp().getTitle()
                    )
                    .planName(
                            enrollment.getPlan().getName()
                    )
                    .build();
        }

        try {

            BigDecimal price =
                    enrollment
                            .getPlan()
                            .getPrice();

            long amountInSmallestUnit =
                    price
                            .movePointRight(2)
                            .longValueExact();

            JSONObject orderRequest =
                    new JSONObject();

            orderRequest.put(
                    "amount",
                    amountInSmallestUnit
            );

            orderRequest.put(
                    "currency",
                    enrollment
                            .getPlan()
                            .getCurrency()
            );

            orderRequest.put(
                    "receipt",
                    "MVP_" +
                            enrollment.getId()
            );

            JSONObject notes =
                    new JSONObject();

            notes.put(
                    "enrollment_id",
                    enrollment.getId()
            );

            notes.put(
                    "mvp_id",
                    enrollment
                            .getMvp()
                            .getId()
            );

            notes.put(
                    "plan_id",
                    enrollment
                            .getPlan()
                            .getId()
            );

            orderRequest.put(
                    "notes",
                    notes
            );

            Order order =
                    razorpayClient
                            .orders
                            .create(orderRequest);

            String orderId =
                    order.get("id");

            enrollment.setRazorpayOrderId(
                    orderId
            );

            enrollment.setPaymentStatus(
                    MvpPaymentStatus.PENDING
            );

            enrollment.setStatus(
                    MvpEnrollmentStatus.PAYMENT_PENDING
            );

            enrollmentRepository.save(
                    enrollment
            );

           

            return MvpPaymentOrderResponse.builder()
                    .enrollmentId(enrollment.getId())
                    .razorpayOrderId(orderId)
                    .razorpayKeyId(razorpayKeyId)
                    .amount(amountInSmallestUnit)
                    .currency(
                            enrollment
                                    .getPlan()
                                    .getCurrency()
                    )
                    .mvpTitle(
                            enrollment
                                    .getMvp()
                                    .getTitle()
                    )
                    .planName(
                            enrollment
                                    .getPlan()
                                    .getName()
                    )
                    .build();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to create Razorpay order",
                    e
            );
        }
    }

    // ==========================================================
    // VERIFY PAYMENT
    // ==========================================================

    @Override
    public MvpEnrollmentResponse verifyPayment(
            Long userId,
            VerifyMvpPaymentRequest request
    ) {

        MvpEnrollment enrollment =
                enrollmentRepository.findById(
                        request.getEnrollmentId()
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Enrollment not found"
                        )
                );

        // Security check
        if (!enrollment.getUser()
                .getId()
                .equals(userId)) {

            throw new RuntimeException(
                    "You are not allowed to verify this payment"
            );
        }

        // Order must match
        if (!request.getRazorpayOrderId()
                .equals(
                        enrollment
                                .getRazorpayOrderId()
                )) {

            throw new RuntimeException(
                    "Razorpay order ID does not match"
            );
        }

        try {

            String signatureData =
                    request.getRazorpayOrderId()
                            + "|"
                            + request.getRazorpayPaymentId();

            boolean valid =
                    Utils.verifySignature(
                            signatureData,
                            request.getRazorpaySignature(),
                            getRazorpaySecret()
                    );

            if (!valid) {

                enrollment.setPaymentStatus(
                        MvpPaymentStatus.FAILED
                );

                enrollmentRepository.save(
                        enrollment
                );

                throw new RuntimeException(
                        "Invalid Razorpay payment signature"
                );
            }

            // ==================================================
            // PAYMENT SUCCESS
            // ==================================================

            enrollment.setRazorpayPaymentId(
                    request.getRazorpayPaymentId()
            );

            enrollment.setPaymentStatus(
                    MvpPaymentStatus.PAID
            );

            enrollment.setStatus(
                    MvpEnrollmentStatus.READY_TO_START
            );

            enrollmentRepository.save(
                    enrollment
            );

            return enrollmentService.activateAfterPayment(
        enrollment.getId()
);
            

        } catch (RuntimeException e) {

            throw e;

        } catch (Exception e) {

            throw new RuntimeException(
                    "Payment verification failed",
                    e
            );
        }
    }

    @Value("${razorpay.key-secret}")
    private String razorpaySecret;

    private String getRazorpaySecret() {
        return razorpaySecret;
    }

    // ==========================================================
    // RESPONSE
    // ==========================================================

    private MvpEnrollmentResponse mapToResponse(
            MvpEnrollment enrollment
    ) {

        MvpEnrollmentResponse response =
                new MvpEnrollmentResponse();

        response.setId(
                enrollment.getId()
        );

        response.setUserId(
                enrollment
                        .getUser()
                        .getId()
        );

        response.setMvpId(
                enrollment
                        .getMvp()
                        .getId()
        );

        response.setMvpCode(
                enrollment
                        .getMvp()
                        .getMvpCode()
        );

        response.setMvpTitle(
                enrollment
                        .getMvp()
                        .getTitle()
        );

        response.setPlanId(
                enrollment
                        .getPlan()
                        .getId()
        );

        response.setPlanCode(
                enrollment
                        .getPlan()
                        .getCode()
        );

        response.setPlanName(
                enrollment
                        .getPlan()
                        .getName()
        );

        response.setDurationHours(
                enrollment
                        .getPlan()
                        .getDurationHours()
        );

        response.setPrice(
                enrollment
                        .getPlan()
                        .getPrice()
        );

        response.setCurrency(
                enrollment
                        .getPlan()
                        .getCurrency()
        );

        response.setFree(
                enrollment
                        .getPlan()
                        .isFree()
        );

        response.setPaymentStatus(
                enrollment
                        .getPaymentStatus()
                        .name()
        );

        response.setEnrollmentStatus(
                enrollment
                        .getStatus()
                        .name()
        );

        response.setStartedAt(
                enrollment.getStartedAt()
        );

        response.setDeadlineAt(
                enrollment.getDeadlineAt()
        );

        response.setCompletedAt(
                enrollment.getCompletedAt()
        );

        response.setProgressPercentage(
                enrollment
                        .getProgressPercentage()
        );

        response.setCompletedTasks(
                enrollment
                        .getCompletedTasks()
        );

        response.setTotalTasks(
                enrollment
                        .getTotalTasks()
        );

        response.setGithubRepoName(
                enrollment
                        .getGithubRepoName()
        );

        response.setGithubRepoUrl(
                enrollment
                        .getGithubRepoUrl()
        );

        response.setGithubRepoCreatedAt(
                enrollment
                        .getGithubRepoCreatedAt()
        );

        response.setLiveDemoUrl(
                enrollment
                        .getLiveDemoUrl()
        );

        response.setRepositoryUrl(
                enrollment
                        .getRepositoryUrl()
        );

        response.setFinalSubmissionUrl(
                enrollment
                        .getFinalSubmissionUrl()
        );

        response.setScore(
                enrollment.getScore()
        );

        response.setXpEarned(
                enrollment.getXpEarned()
        );

        response.setTeamId(
                enrollment.getTeamId()
        );

        response.setCreatedAt(
                enrollment.getCreatedAt()
        );

        response.setUpdatedAt(
                enrollment.getUpdatedAt()
        );

        return response;
    }
}
