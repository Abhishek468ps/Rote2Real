package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.MvpEnrollment;
import com.braintrain.mvp.enums.MvpEnrollmentStatus;
import com.braintrain.mvp.enums.MvpPaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MvpEnrollmentRepository
        extends JpaRepository<MvpEnrollment, Long> {

                 // =========================================================
    // FIND BY RAZORPAY ORDER
    // =========================================================

    Optional<MvpEnrollment> findByRazorpayOrderId(
            String razorpayOrderId
    );

    // =========================================================
    // FIND BY RAZORPAY PAYMENT
    // =========================================================

    Optional<MvpEnrollment> findByRazorpayPaymentId(
            String razorpayPaymentId
    );

    // =========================================================
    // USER ENROLLMENTS
    // =========================================================

    List<MvpEnrollment>
    findByUserIdOrderByCreatedAtDesc(Long userId);

    
    // =========================================================
    // USER + STATUS
    // =========================================================

   /*  
   List<MvpEnrollment>
    findByUserIdAndEnrollmentStatus(
            Long userId,
            MvpEnrollmentStatus status
    );
    */
List<MvpEnrollment> findByStatus(
            MvpEnrollmentStatus status
    );


     // =========================================================
    // USER + MVP
    // =========================================================

    Optional<MvpEnrollment> findByUserIdAndMvpId(
            Long userId,
            Long mvpId
    );

    Optional<MvpEnrollment>
    findByUserIdAndMvpIdAndPlanId(
            Long userId,
            Long mvpId,
            Long planId
    );

    boolean existsByUserIdAndMvpIdAndPlanId(
            Long userId,
            Long mvpId,
            Long planId
    );

    List<MvpEnrollment>
    findByMvpIdOrderByCreatedAtDesc(Long mvpId);

    List<MvpEnrollment>
    findByPaymentStatus(
            MvpPaymentStatus paymentStatus
    );

    long countByStatus(
            MvpEnrollmentStatus status
    );

    long countByMvpId(
            Long mvpId
    );
}
