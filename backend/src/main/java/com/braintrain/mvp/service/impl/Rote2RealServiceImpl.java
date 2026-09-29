package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.config.Rote2RealScoringProperties;
import com.braintrain.mvp.dto.request.Rote2RealRegisterRequest;
import com.braintrain.mvp.dto.request.Rote2RealSubmissionRequest;
import com.braintrain.mvp.dto.request.Rote2RealVerifyPaymentRequest;
import com.braintrain.mvp.dto.response.*;
import com.braintrain.mvp.entity.Rote2RealClassification;
import com.braintrain.mvp.entity.Rote2RealExercise;
import com.braintrain.mvp.entity.Rote2RealStudent;
import com.braintrain.mvp.entity.Rote2RealSubmission;
import com.braintrain.mvp.repository.Rote2RealClassificationRepository;
import com.braintrain.mvp.repository.Rote2RealExerciseRepository;
import com.braintrain.mvp.repository.Rote2RealStudentRepository;
import com.braintrain.mvp.repository.Rote2RealSubmissionRepository;
import com.braintrain.mvp.service.Rote2RealService;
import com.braintrain.mvp.utils.Rote2RealPricingHelper;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class Rote2RealServiceImpl implements Rote2RealService {

    private final Rote2RealStudentRepository studentRepository;
    private final Rote2RealExerciseRepository exerciseRepository;
    private final Rote2RealSubmissionRepository submissionRepository;
    private final Rote2RealClassificationRepository classificationRepository;
    private final Rote2RealPricingHelper pricingHelper;
    private final Rote2RealScoringProperties scoringProperties;

    private final RazorpayClient razorpayClient;

    @Value("${razorpay.key-id}")
    private String razorpayKeyId;

    @Value("${razorpay.key-secret}")
    private String razorpayKeySecret;

    // =========================================================================
    // 1. REGISTRATION + RAZORPAY ORDER
    // =========================================================================

    @Override
    public Rote2RealRegistrationResponse registerStudent(Rote2RealRegisterRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        // Check if student already registered
        Rote2RealStudent student = studentRepository.findByEmail(email).orElse(null);

        if (student != null && "PAID".equalsIgnoreCase(student.getPaymentStatus())) {
            // Already enrolled and paid
            return mapToRegistrationResponse(student);
        }

        // Determine pricing: India = ₹1 (100 paise), International = ₹10 INR equivalent
        Rote2RealPricingHelper.PricingInfo pricing = pricingHelper.resolvePricing(request.getCountry());

        if (student == null) {
            student = new Rote2RealStudent();
            student.setEmail(email);
        }

        student.setName(request.getName().trim());
        student.setPhone(request.getPhone());
        student.setCountry(request.getCountry().trim());
        student.setIsInternational(pricing.isInternational());
        student.setPaymentAmountMinor(pricing.getAmountMinor());
        student.setPaymentCurrency(pricing.getCurrency());
        student.setPaymentStatus("PENDING");

        student = studentRepository.save(student);

        // Create Razorpay Order
        try {
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", student.getPaymentAmountMinor());
            orderRequest.put("currency", student.getPaymentCurrency());
            orderRequest.put("receipt", "R2R_" + student.getId());

            JSONObject notes = new JSONObject();
            notes.put("student_id", student.getId());
            notes.put("email", student.getEmail());
            notes.put("program", "Rote2Real");
            orderRequest.put("notes", notes);

            Order order = razorpayClient.orders.create(orderRequest);
            String orderId = order.get("id");

            student.setRazorpayOrderId(orderId);
            student = studentRepository.save(student);

        } catch (Exception e) {
            log.error("Failed to create Razorpay order for Rote2Real student: {}", email, e);
            throw new RuntimeException("Failed to initiate payment gateway order: " + e.getMessage(), e);
        }

        return mapToRegistrationResponse(student);
    }

    // =========================================================================
    // 2. VERIFY PAYMENT SERVER-SIDE & ENROLL
    // =========================================================================

    @Override
    public Rote2RealPaymentVerificationResponse verifyPayment(Rote2RealVerifyPaymentRequest request) {
        Rote2RealStudent student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student record not found for id: " + request.getStudentId()));

        if ("PAID".equalsIgnoreCase(student.getPaymentStatus())) {
            return Rote2RealPaymentVerificationResponse.builder()
                    .studentId(student.getId())
                    .email(student.getEmail())
                    .paymentStatus("PAID")
                    .razorpayPaymentId(student.getRazorpayPaymentId())
                    .enrolled(true)
                    .message("Student payment was already verified and enrolled")
                    .build();
        }

        if (student.getRazorpayOrderId() == null || !student.getRazorpayOrderId().equals(request.getRazorpayOrderId())) {
            throw new RuntimeException("Order ID does not match registered student order");
        }

        try {
            String signatureData = request.getRazorpayOrderId() + "|" + request.getRazorpayPaymentId();
            boolean valid = Utils.verifySignature(
                    signatureData,
                    request.getRazorpaySignature(),
                    razorpayKeySecret
            );

            if (!valid) {
                student.setPaymentStatus("FAILED");
                studentRepository.save(student);
                throw new RuntimeException("Invalid Razorpay payment signature");
            }

            student.setRazorpayPaymentId(request.getRazorpayPaymentId());
            student.setPaymentStatus("PAID");
            studentRepository.save(student);

            log.info("Rote2Real enrollment payment verified successfully for student id {}", student.getId());

            return Rote2RealPaymentVerificationResponse.builder()
                    .studentId(student.getId())
                    .email(student.getEmail())
                    .paymentStatus("PAID")
                    .razorpayPaymentId(student.getRazorpayPaymentId())
                    .enrolled(true)
                    .message("Payment verified successfully. Welcome to Rote2Real 20-Day Sprint!")
                    .build();

        } catch (RuntimeException re) {
            throw re;
        } catch (Exception e) {
            log.error("Error verifying payment for Rote2Real student {}", student.getId(), e);
            throw new RuntimeException("Payment verification failed: " + e.getMessage(), e);
        }
    }

    // =========================================================================
    // 3. EXERCISES & EVIDENCE SUBMISSION
    // =========================================================================

    @Override
    @Transactional(readOnly = true)
    public List<Rote2RealExerciseResponse> getExercises(Long studentId) {
        List<Rote2RealExercise> exercises = exerciseRepository.findAllByOrderByDayNumberAsc();

        Map<Long, Rote2RealSubmission> submissionMap = new HashMap<>();
        if (studentId != null) {
            List<Rote2RealSubmission> submissions = submissionRepository.findByStudentId(studentId);
            for (Rote2RealSubmission s : submissions) {
                submissionMap.put(s.getExercise().getId(), s);
            }
        }

        return exercises.stream()
                .map(exercise -> mapToExerciseResponse(exercise, submissionMap.get(exercise.getId())))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Rote2RealExerciseResponse getExerciseByDay(Integer dayNumber, Long studentId) {
        Rote2RealExercise exercise = exerciseRepository.findByDayNumber(dayNumber)
                .orElseThrow(() -> new RuntimeException("Exercise for day " + dayNumber + " not found"));

        Rote2RealSubmission submission = null;
        if (studentId != null) {
            submission = submissionRepository.findByStudentIdAndExerciseId(studentId, exercise.getId()).orElse(null);
        }

        return mapToExerciseResponse(exercise, submission);
    }

    @Override
    public Rote2RealSubmissionResponse submitEvidence(Long studentId, Rote2RealSubmissionRequest request) {
        Rote2RealStudent student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));

        if (!"PAID".equalsIgnoreCase(student.getPaymentStatus())) {
            throw new RuntimeException("Student payment pending. Please complete registration payment to submit exercises.");
        }

        Rote2RealExercise exercise = exerciseRepository.findById(request.getExerciseId())
                .orElseThrow(() -> new RuntimeException("Exercise not found with id: " + request.getExerciseId()));

        Rote2RealSubmission submission = submissionRepository
                .findByStudentIdAndExerciseId(studentId, exercise.getId())
                .orElseGet(() -> {
                    Rote2RealSubmission newSub = new Rote2RealSubmission();
                    newSub.setStudent(student);
                    newSub.setExercise(exercise);
                    return newSub;
                });

        if (request.getEvidenceText() != null) {
            submission.setEvidenceText(request.getEvidenceText().trim());
        }
        if (request.getEvidenceUrl() != null) {
            submission.setEvidenceUrl(request.getEvidenceUrl().trim());
        }
        if (request.getEvidenceFilePath() != null) {
            submission.setEvidenceFilePath(request.getEvidenceFilePath().trim());
        }

        // Validate that if evidence is required, at least one evidence field is non-empty
        boolean hasEvidence = (submission.getEvidenceText() != null && !submission.getEvidenceText().isBlank())
                || (submission.getEvidenceUrl() != null && !submission.getEvidenceUrl().isBlank())
                || (submission.getEvidenceFilePath() != null && !submission.getEvidenceFilePath().isBlank());

        if (exercise.getRequiresEvidence() && !hasEvidence) {
            throw new RuntimeException("Evidence is required for Day " + exercise.getDayNumber() + ": " + exercise.getTitle());
        }

        submission.setStatus("COMPLETED");
        submission.setSubmittedAt(LocalDateTime.now());

        if (request.getQualityScore() != null) {
            submission.setQualityScore(request.getQualityScore());
        } else if (submission.getQualityScore() == null) {
            // Default deterministic quality baseline: 8/10 for valid submitted evidence
            submission.setQualityScore(8);
        }

        submission = submissionRepository.save(submission);

        return mapToSubmissionResponse(submission);
    }

    @Override
    public String uploadEvidenceFile(Long studentId, Long exerciseId, MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("Upload file cannot be empty");
        }

        if (file.getSize() > 10 * 1024 * 1024) { // 10 MB limit
            throw new RuntimeException("File size must not exceed 10 MB");
        }

        String uploadDir = "uploads/rote2real/";
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String originalFilename = file.getOriginalFilename() != null ? file.getOriginalFilename() : "evidence.dat";
        String cleanFilename = originalFilename.replaceAll("[^a-zA-Z0-9.-]", "_");
        String storedFilename = "student_" + studentId + "_ex_" + exerciseId + "_" + UUID.randomUUID() + "_" + cleanFilename;

        Path targetPath = Paths.get(uploadDir + storedFilename);
        try {
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            log.error("Failed to store Rote2Real evidence file", e);
            throw new RuntimeException("Could not store evidence file: " + e.getMessage());
        }

        return "/uploads/rote2real/" + storedFilename;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Rote2RealSubmissionResponse> getStudentSubmissions(Long studentId) {
        List<Rote2RealSubmission> submissions = submissionRepository.findByStudentId(studentId);
        return submissions.stream()
                .map(this::mapToSubmissionResponse)
                .sorted(Comparator.comparing(Rote2RealSubmissionResponse::getDayNumber))
                .collect(Collectors.toList());
    }

    // =========================================================================
    // 4. PROGRESS & COMPLETION
    // =========================================================================

    @Override
    @Transactional(readOnly = true)
    public Rote2RealProgressResponse getStudentProgress(Long studentId) {
        Rote2RealStudent student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));

        List<Rote2RealExercise> allExercises = exerciseRepository.findAllByOrderByDayNumberAsc();
        int totalExercises = allExercises.isEmpty() ? 20 : allExercises.size();

        List<Rote2RealSubmission> submissions = submissionRepository.findByStudentId(studentId);
        Map<Long, Rote2RealSubmission> completedMap = submissions.stream()
                .filter(s -> "COMPLETED".equalsIgnoreCase(s.getStatus()))
                .collect(Collectors.toMap(s -> s.getExercise().getId(), Function.identity(), (a, b) -> a));

        int completedCount = completedMap.size();
        int pendingCount = totalExercises - completedCount;

        BigDecimal completionPct = BigDecimal.valueOf(completedCount)
                .multiply(BigDecimal.valueOf(100))
                .divide(BigDecimal.valueOf(totalExercises), 2, RoundingMode.HALF_UP);

        // Category breakdown
        Map<String, Integer> categoryTotals = new LinkedHashMap<>();
        Map<String, Integer> categoryProgress = new LinkedHashMap<>();

        for (Rote2RealExercise ex : allExercises) {
            String cat = ex.getCategory() != null ? ex.getCategory() : "general";
            categoryTotals.put(cat, categoryTotals.getOrDefault(cat, 0) + 1);

            if (completedMap.containsKey(ex.getId())) {
                categoryProgress.put(cat, categoryProgress.getOrDefault(cat, 0) + 1);
            } else {
                categoryProgress.putIfAbsent(cat, 0);
            }
        }

        List<Rote2RealSubmissionResponse> recent = submissions.stream()
                .sorted((a, b) -> {
                    if (a.getSubmittedAt() == null && b.getSubmittedAt() == null) return 0;
                    if (a.getSubmittedAt() == null) return 1;
                    if (b.getSubmittedAt() == null) return -1;
                    return b.getSubmittedAt().compareTo(a.getSubmittedAt());
                })
                .limit(5)
                .map(this::mapToSubmissionResponse)
                .collect(Collectors.toList());

        return Rote2RealProgressResponse.builder()
                .studentId(student.getId())
                .studentName(student.getName())
                .studentEmail(student.getEmail())
                .totalExercises(totalExercises)
                .completedExercises(completedCount)
                .pendingExercises(pendingCount)
                .completionPercentage(completionPct)
                .categoryTotals(categoryTotals)
                .categoryProgress(categoryProgress)
                .recentSubmissions(recent)
                .build();
    }

    // =========================================================================
    // 5. DETERMINISTIC EVALUATION & COMPREHENSIVE REPORT
    // =========================================================================

    @Override
    public Rote2RealReportResponse evaluateAndGenerateReport(Long studentId) {
        Rote2RealStudent student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));

        List<Rote2RealExercise> exercises = exerciseRepository.findAllByOrderByDayNumberAsc();
        int totalExercises = exercises.isEmpty() ? 20 : exercises.size();

        List<Rote2RealSubmission> submissions = submissionRepository.findByStudentId(studentId);
        Map<Long, Rote2RealSubmission> subMap = submissions.stream()
                .collect(Collectors.toMap(s -> s.getExercise().getId(), Function.identity(), (a, b) -> a));

        // 1. Completion Percentage
        long completedCount = submissions.stream()
                .filter(s -> "COMPLETED".equalsIgnoreCase(s.getStatus()))
                .count();

        BigDecimal completionPct = BigDecimal.valueOf(completedCount)
                .multiply(BigDecimal.valueOf(100))
                .divide(BigDecimal.valueOf(totalExercises), 2, RoundingMode.HALF_UP);

        // 2. Evidence Score (quality of submitted exercises out of 100)
        // Average quality score (0 to 10) * 10
        double avgQuality = 0.0;
        int scoredCount = 0;
        for (Rote2RealSubmission s : submissions) {
            if ("COMPLETED".equalsIgnoreCase(s.getStatus()) && s.getQualityScore() != null) {
                avgQuality += s.getQualityScore();
                scoredCount++;
            }
        }
        if (scoredCount > 0) {
            avgQuality = avgQuality / scoredCount;
        } else if (completedCount > 0) {
            avgQuality = 7.5; // default fallback if unrated
        }
        BigDecimal evidenceScore = BigDecimal.valueOf(avgQuality * 10.0).setScale(2, RoundingMode.HALF_UP);

        // 3. Consistency Percentage
        // Measures steady progression across days (ratio of completed days up to max submitted day)
        int maxDaySubmitted = 0;
        for (Rote2RealExercise ex : exercises) {
            Rote2RealSubmission sub = subMap.get(ex.getId());
            if (sub != null && "COMPLETED".equalsIgnoreCase(sub.getStatus())) {
                if (ex.getDayNumber() > maxDaySubmitted) {
                    maxDaySubmitted = ex.getDayNumber();
                }
            }
        }

        BigDecimal consistencyPct;
        if (maxDaySubmitted == 0) {
            consistencyPct = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        } else {
            // completed / maxDaySubmitted * 100
            consistencyPct = BigDecimal.valueOf(completedCount)
                    .multiply(BigDecimal.valueOf(100))
                    .divide(BigDecimal.valueOf(maxDaySubmitted), 2, RoundingMode.HALF_UP);
            if (consistencyPct.compareTo(BigDecimal.valueOf(100)) > 0) {
                consistencyPct = BigDecimal.valueOf(100).setScale(2, RoundingMode.HALF_UP);
            }
        }

        // 4. Deterministic Final Score = (completionWeight * completionPct) + (evidenceWeight * evidenceScore) + (consistencyWeight * consistencyPct)
        BigDecimal finalScore = (completionPct.multiply(scoringProperties.getCompletionWeight()))
                .add(evidenceScore.multiply(scoringProperties.getEvidenceWeight()))
                .add(consistencyPct.multiply(scoringProperties.getConsistencyWeight()))
                .setScale(2, RoundingMode.HALF_UP);

        // 5. Achievement Level Determination: Gold / Silver / Bronze / Incomplete
        String level;
        if (completionPct.compareTo(scoringProperties.getGoldCompletionThreshold()) >= 0
                && finalScore.compareTo(scoringProperties.getGoldScoreThreshold()) >= 0) {
            level = "GOLD";
        } else if (completionPct.compareTo(scoringProperties.getSilverCompletionThreshold()) >= 0
                && finalScore.compareTo(scoringProperties.getSilverScoreThreshold()) >= 0) {
            level = "SILVER";
        } else if (completionPct.compareTo(scoringProperties.getBronzeCompletionThreshold()) >= 0
                && finalScore.compareTo(scoringProperties.getBronzeScoreThreshold()) >= 0) {
            level = "BRONZE";
        } else {
            // Note: DB constraint allows GOLD/SILVER/BRONZE/NOT_CLASSIFIED
            level = "NOT_CLASSIFIED";
        }

        // Persist or Update Classification in rote2real_classifications
        Rote2RealClassification classification = classificationRepository.findByStudentId(studentId)
                .orElseGet(() -> {
                    Rote2RealClassification c = new Rote2RealClassification();
                    c.setStudent(student);
                    return c;
                });

        classification.setCompletionPct(completionPct);
        classification.setEvidenceScore(evidenceScore);
        classification.setConsistencyPct(consistencyPct);
        classification.setFinalScore(finalScore);
        classification.setLevel(level);
        classification.setComputedAt(LocalDateTime.now());
        classificationRepository.save(classification);

        // Map Category / Skill Area Breakdown
        Map<String, List<Rote2RealExercise>> categoryMap = exercises.stream()
                .collect(Collectors.groupingBy(ex -> ex.getCategory() != null ? ex.getCategory() : "general"));

        Map<String, Rote2RealReportResponse.SkillAreaBreakdown> skillAreas = new LinkedHashMap<>();
        for (Map.Entry<String, List<Rote2RealExercise>> entry : categoryMap.entrySet()) {
            String cat = entry.getKey();
            List<Rote2RealExercise> catExercises = entry.getValue();
            int catTotal = catExercises.size();
            int catCompleted = 0;
            double catScoreSum = 0;
            int catScoreCount = 0;

            for (Rote2RealExercise ce : catExercises) {
                Rote2RealSubmission cs = subMap.get(ce.getId());
                if (cs != null && "COMPLETED".equalsIgnoreCase(cs.getStatus())) {
                    catCompleted++;
                    if (cs.getQualityScore() != null) {
                        catScoreSum += cs.getQualityScore();
                        catScoreCount++;
                    }
                }
            }

            BigDecimal rate = catTotal > 0
                    ? BigDecimal.valueOf(catCompleted).multiply(BigDecimal.valueOf(100)).divide(BigDecimal.valueOf(catTotal), 2, RoundingMode.HALF_UP)
                    : BigDecimal.ZERO;
            BigDecimal avgCatScore = catScoreCount > 0
                    ? BigDecimal.valueOf(catScoreSum / catScoreCount).setScale(2, RoundingMode.HALF_UP)
                    : BigDecimal.ZERO;

            skillAreas.put(cat, Rote2RealReportResponse.SkillAreaBreakdown.builder()
                    .category(cat)
                    .total(catTotal)
                    .completed(catCompleted)
                    .completionRate(rate)
                    .averageScore(avgCatScore)
                    .build());
        }

        // Build Exercise Results list
        List<Rote2RealSubmissionResponse> exerciseResults = exercises.stream()
                .map(ex -> {
                    Rote2RealSubmission sub = subMap.get(ex.getId());
                    if (sub != null) {
                        return mapToSubmissionResponse(sub);
                    } else {
                        return Rote2RealSubmissionResponse.builder()
                                .studentId(student.getId())
                                .exerciseId(ex.getId())
                                .dayNumber(ex.getDayNumber())
                                .exerciseTitle(ex.getTitle())
                                .category(ex.getCategory())
                                .status("NOT_SUBMITTED")
                                .build();
                    }
                })
                .collect(Collectors.toList());

        // Display user-friendly achievement level name: "INCOMPLETE" if NOT_CLASSIFIED
        String displayLevel = "NOT_CLASSIFIED".equals(level) ? "INCOMPLETE" : level;

        return Rote2RealReportResponse.builder()
                .studentId(student.getId())
                .studentName(student.getName())
                .studentEmail(student.getEmail())
                .country(student.getCountry())
                .isInternational(student.getIsInternational())
                .totalExercises(totalExercises)
                .completedExercises((int) completedCount)
                .completionPercentage(completionPct)
                .evidenceScore(evidenceScore)
                .consistencyPercentage(consistencyPct)
                .finalScore(finalScore)
                .achievementLevel(displayLevel)
                .evaluatedAt(classification.getComputedAt())
                .skillAreas(skillAreas)
                .exerciseResults(exerciseResults)
                .build();
    }

    // =========================================================================
    // HELPER MAPPERS
    // =========================================================================

    private Rote2RealRegistrationResponse mapToRegistrationResponse(Rote2RealStudent student) {
        return Rote2RealRegistrationResponse.builder()
                .studentId(student.getId())
                .name(student.getName())
                .email(student.getEmail())
                .phone(student.getPhone())
                .country(student.getCountry())
                .isInternational(student.getIsInternational())
                .paymentAmountMinor(student.getPaymentAmountMinor())
                .paymentCurrency(student.getPaymentCurrency())
                .razorpayOrderId(student.getRazorpayOrderId())
                .razorpayKeyId(razorpayKeyId)
                .paymentStatus(student.getPaymentStatus())
                .registeredAt(student.getRegisteredAt())
                .build();
    }

    private Rote2RealExerciseResponse mapToExerciseResponse(Rote2RealExercise ex, Rote2RealSubmission sub) {
        return Rote2RealExerciseResponse.builder()
                .id(ex.getId())
                .dayNumber(ex.getDayNumber())
                .title(ex.getTitle())
                .description(ex.getDescription())
                .category(ex.getCategory())
                .requiresEvidence(ex.getRequiresEvidence())
                .evidenceType(ex.getEvidenceType())
                .orderIndex(ex.getOrderIndex())
                .isActive(ex.getIsActive())
                .submissionStatus(sub != null ? sub.getStatus() : "NOT_SUBMITTED")
                .evidenceText(sub != null ? sub.getEvidenceText() : null)
                .evidenceUrl(sub != null ? sub.getEvidenceUrl() : null)
                .evidenceFilePath(sub != null ? sub.getEvidenceFilePath() : null)
                .qualityScore(sub != null ? sub.getQualityScore() : null)
                .build();
    }

    private Rote2RealSubmissionResponse mapToSubmissionResponse(Rote2RealSubmission s) {
        return Rote2RealSubmissionResponse.builder()
                .id(s.getId())
                .studentId(s.getStudent().getId())
                .exerciseId(s.getExercise().getId())
                .dayNumber(s.getExercise().getDayNumber())
                .exerciseTitle(s.getExercise().getTitle())
                .category(s.getExercise().getCategory())
                .status(s.getStatus())
                .evidenceText(s.getEvidenceText())
                .evidenceUrl(s.getEvidenceUrl())
                .evidenceFilePath(s.getEvidenceFilePath())
                .qualityScore(s.getQualityScore())
                .submittedAt(s.getSubmittedAt())
                .build();
    }
}
