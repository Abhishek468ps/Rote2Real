package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.request.Rote2RealRegisterRequest;
import com.braintrain.mvp.dto.request.Rote2RealSubmissionRequest;
import com.braintrain.mvp.dto.request.Rote2RealVerifyPaymentRequest;
import com.braintrain.mvp.dto.response.*;
import com.braintrain.mvp.service.Rote2RealService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public/rote2real")
@RequiredArgsConstructor
public class Rote2RealController {

    private final Rote2RealService rote2RealService;

    // =========================================================================
    // 1. REGISTRATION
    // =========================================================================

    @PostMapping("/register")
    public ResponseEntity<Rote2RealRegistrationResponse> register(
            @Valid @RequestBody Rote2RealRegisterRequest request
    ) {
        return ResponseEntity.ok(rote2RealService.registerStudent(request));
    }

    // =========================================================================
    // 2. PAYMENT VERIFICATION
    // =========================================================================

    @PostMapping("/verify-payment")
    public ResponseEntity<Rote2RealPaymentVerificationResponse> verifyPayment(
            @Valid @RequestBody Rote2RealVerifyPaymentRequest request
    ) {
        return ResponseEntity.ok(rote2RealService.verifyPayment(request));
    }

    // =========================================================================
    // 3. EXERCISES
    // =========================================================================

    @GetMapping("/exercises")
    public ResponseEntity<List<Rote2RealExerciseResponse>> getExercises(
            @RequestParam(required = false) Long studentId
    ) {
        return ResponseEntity.ok(rote2RealService.getExercises(studentId));
    }

    @GetMapping("/exercises/day/{dayNumber}")
    public ResponseEntity<Rote2RealExerciseResponse> getExerciseByDay(
            @PathVariable Integer dayNumber,
            @RequestParam(required = false) Long studentId
    ) {
        return ResponseEntity.ok(rote2RealService.getExerciseByDay(dayNumber, studentId));
    }

    // =========================================================================
    // 4. SUBMISSIONS & EVIDENCE
    // =========================================================================

    @PostMapping("/submissions")
    public ResponseEntity<Rote2RealSubmissionResponse> submitEvidence(
            @RequestParam Long studentId,
            @Valid @RequestBody Rote2RealSubmissionRequest request
    ) {
        return ResponseEntity.ok(rote2RealService.submitEvidence(studentId, request));
    }

    @PostMapping("/upload-evidence")
    public ResponseEntity<Map<String, String>> uploadEvidenceFile(
            @RequestParam Long studentId,
            @RequestParam Long exerciseId,
            @RequestParam("file") MultipartFile file
    ) {
        String filePath = rote2RealService.uploadEvidenceFile(studentId, exerciseId, file);
        return ResponseEntity.ok(Map.of("filePath", filePath));
    }

    @GetMapping("/submissions")
    public ResponseEntity<List<Rote2RealSubmissionResponse>> getSubmissions(
            @RequestParam Long studentId
    ) {
        return ResponseEntity.ok(rote2RealService.getStudentSubmissions(studentId));
    }

    // =========================================================================
    // 5. PROGRESS & COMPLETION
    // =========================================================================

    @GetMapping("/progress")
    public ResponseEntity<Rote2RealProgressResponse> getProgress(
            @RequestParam Long studentId
    ) {
        return ResponseEntity.ok(rote2RealService.getStudentProgress(studentId));
    }

    // =========================================================================
    // 6. EVALUATION & FINAL REPORT
    // =========================================================================

    @GetMapping("/report")
    public ResponseEntity<Rote2RealReportResponse> getReport(
            @RequestParam Long studentId
    ) {
        return ResponseEntity.ok(rote2RealService.evaluateAndGenerateReport(studentId));
    }
}
