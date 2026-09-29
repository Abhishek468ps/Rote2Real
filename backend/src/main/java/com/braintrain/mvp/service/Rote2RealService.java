package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.request.Rote2RealRegisterRequest;
import com.braintrain.mvp.dto.request.Rote2RealSubmissionRequest;
import com.braintrain.mvp.dto.request.Rote2RealVerifyPaymentRequest;
import com.braintrain.mvp.dto.response.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface Rote2RealService {

    /**
     * Registers a student for Rote2Real program and creates a Razorpay payment order.
     */
    Rote2RealRegistrationResponse registerStudent(Rote2RealRegisterRequest request);

    /**
     * Verifies payment server-side via Razorpay signature and completes enrollment.
     */
    Rote2RealPaymentVerificationResponse verifyPayment(Rote2RealVerifyPaymentRequest request);

    /**
     * Returns all active 20 exercises ordered by day_number.
     * If studentId is provided, also annotates each exercise with the student's submission status.
     */
    List<Rote2RealExerciseResponse> getExercises(Long studentId);

    /**
     * Returns a specific exercise by day number.
     */
    Rote2RealExerciseResponse getExerciseByDay(Integer dayNumber, Long studentId);

    /**
     * Submits or updates evidence for an exercise.
     */
    Rote2RealSubmissionResponse submitEvidence(Long studentId, Rote2RealSubmissionRequest request);

    /**
     * Uploads an evidence file (e.g. screenshot, document, pdf) for a student submission.
     */
    String uploadEvidenceFile(Long studentId, Long exerciseId, MultipartFile file);

    /**
     * Retrieves all submissions for a student.
     */
    List<Rote2RealSubmissionResponse> getStudentSubmissions(Long studentId);

    /**
     * Computes real-time progress for a student.
     */
    Rote2RealProgressResponse getStudentProgress(Long studentId);

    /**
     * Evaluates submissions and generates the final comprehensive report
     * with Gold/Silver/Bronze/Incomplete classification.
     */
    Rote2RealReportResponse evaluateAndGenerateReport(Long studentId);
}
