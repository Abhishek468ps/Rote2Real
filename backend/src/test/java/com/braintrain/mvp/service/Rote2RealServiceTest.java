package com.braintrain.mvp.service;

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
import com.braintrain.mvp.service.impl.Rote2RealServiceImpl;
import com.braintrain.mvp.utils.Rote2RealPricingHelper;
import com.razorpay.Order;
import com.razorpay.OrderClient;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class Rote2RealServiceTest {

    @Mock
    private Rote2RealStudentRepository studentRepository;

    @Mock
    private Rote2RealExerciseRepository exerciseRepository;

    @Mock
    private Rote2RealSubmissionRepository submissionRepository;

    @Mock
    private Rote2RealClassificationRepository classificationRepository;

    @Mock
    private RazorpayClient razorpayClient;

    private Rote2RealPricingHelper pricingHelper;
    private Rote2RealScoringProperties scoringProperties;
    private Rote2RealServiceImpl rote2RealService;

    @BeforeEach
    void setUp() {
        pricingHelper = new Rote2RealPricingHelper();
        scoringProperties = new Rote2RealScoringProperties();

        rote2RealService = new Rote2RealServiceImpl(
                studentRepository,
                exerciseRepository,
                submissionRepository,
                classificationRepository,
                pricingHelper,
                scoringProperties,
                razorpayClient
        );

        ReflectionTestUtils.setField(rote2RealService, "razorpayKeyId", "rzp_test_key123");
        ReflectionTestUtils.setField(rote2RealService, "razorpayKeySecret", "test_secret_xyz");
    }

    // =========================================================================
    // 1. REGISTRATION TESTS
    // =========================================================================

    @Test
    @DisplayName("Registration India: profile saved without creating a Razorpay order")
    void testRegisterStudentIndia() {
        Rote2RealRegisterRequest request = Rote2RealRegisterRequest.builder()
                .name("Arjun Sharma")
                .email("arjun@example.com")
                .country("India")
                .phone("9876543210")
                .universityName("Manipal University")
                .courseDegree("B.Sc Data Science")
                .yearOfStudy("1st Year")
                .track("Generative AI")
                .build();

        when(studentRepository.findByEmail("arjun@example.com")).thenReturn(Optional.empty());

        Rote2RealStudent savedStudent = new Rote2RealStudent();
        savedStudent.setId(101L);
        savedStudent.setEmail("arjun@example.com");
        savedStudent.setName("Arjun Sharma");
        savedStudent.setCountry("India");
        savedStudent.setUniversityName("Manipal University");
        savedStudent.setCourseDegree("B.Sc Data Science");
        savedStudent.setYearOfStudy("1st Year");
        savedStudent.setTrack("Generative AI");
        savedStudent.setIsInternational(false);
        savedStudent.setPaymentAmountMinor(100L);
        savedStudent.setPaymentCurrency("INR");
        savedStudent.setPaymentStatus("PENDING");

        when(studentRepository.save(any(Rote2RealStudent.class))).thenReturn(savedStudent);

        Rote2RealRegistrationResponse response = rote2RealService.registerStudent(request);

        assertNotNull(response);
        assertEquals(101L, response.getStudentId());
        assertEquals(100L, response.getPaymentAmountMinor());
        assertEquals("INR", response.getPaymentCurrency());
        assertFalse(response.getIsInternational());
        assertNull(response.getRazorpayOrderId());
        assertEquals("Registration successful. Your Rote2Real profile has been saved.", response.getMessage());
        verifyNoInteractions(razorpayClient);
    }

    @Test
    @DisplayName("Registration International (USA): profile saved without creating a Razorpay order")
    void testRegisterStudentInternational() {
        Rote2RealRegisterRequest request = Rote2RealRegisterRequest.builder()
                .name("John Doe")
                .email("john@example.com")
                .country("USA")
                .phone("1234567890")
                .universityName("University of Michigan")
                .courseDegree("MS Data Science")
                .yearOfStudy("1st Year")
                .track("Generative AI")
                .build();

        when(studentRepository.findByEmail("john@example.com")).thenReturn(Optional.empty());

        Rote2RealStudent savedStudent = new Rote2RealStudent();
        savedStudent.setId(102L);
        savedStudent.setEmail("john@example.com");
        savedStudent.setName("John Doe");
        savedStudent.setCountry("USA");
        savedStudent.setUniversityName("University of Michigan");
        savedStudent.setCourseDegree("MS Data Science");
        savedStudent.setYearOfStudy("1st Year");
        savedStudent.setTrack("Generative AI");
        savedStudent.setIsInternational(true);
        savedStudent.setPaymentAmountMinor(12L);
        savedStudent.setPaymentCurrency("USD");
        savedStudent.setPaymentStatus("PENDING");

        when(studentRepository.save(any(Rote2RealStudent.class))).thenReturn(savedStudent);

        Rote2RealRegistrationResponse response = rote2RealService.registerStudent(request);

        assertNotNull(response);
        assertEquals(102L, response.getStudentId());
        assertEquals(12L, response.getPaymentAmountMinor());
        assertEquals("USD", response.getPaymentCurrency());
        assertTrue(response.getIsInternational());
        assertNull(response.getRazorpayOrderId());
        assertEquals("Registration successful. Your Rote2Real profile has been saved.", response.getMessage());
        verifyNoInteractions(razorpayClient);
    }

    @Test
    @DisplayName("Registration saves profile details and does not create a Razorpay order")
    void testRegisterStudentSkipsPaymentAndSavesProfile() {
        Rote2RealRegisterRequest request = Rote2RealRegisterRequest.builder()
                .name("Aisha Khan")
                .email("aisha@example.com")
                .phone("9876543210")
                .country("India")
                .universityName("IIT Delhi")
                .courseDegree("B.Tech Computer Science")
                .yearOfStudy("2nd Year")
                .track("Applied AI")
                .build();

        when(studentRepository.findByEmail("aisha@example.com")).thenReturn(Optional.empty());

        Rote2RealStudent savedStudent = new Rote2RealStudent();
        savedStudent.setId(103L);
        savedStudent.setName("Aisha Khan");
        savedStudent.setEmail("aisha@example.com");
        savedStudent.setPhone("9876543210");
        savedStudent.setCountry("India");
        savedStudent.setUniversityName("IIT Delhi");
        savedStudent.setCourseDegree("B.Tech Computer Science");
        savedStudent.setYearOfStudy("2nd Year");
        savedStudent.setTrack("Applied AI");
        savedStudent.setPaymentAmountMinor(100L);
        savedStudent.setPaymentCurrency("INR");
        savedStudent.setPaymentStatus("PENDING");
        when(studentRepository.save(any(Rote2RealStudent.class))).thenReturn(savedStudent);

        Rote2RealRegistrationResponse response = rote2RealService.registerStudent(request);

        assertNotNull(response);
        assertEquals(103L, response.getStudentId());
        assertEquals("Aisha Khan", response.getName());
        assertEquals("aisha@example.com", response.getEmail());
        assertEquals("9876543210", response.getPhone());
        assertEquals("India", response.getCountry());
        assertEquals("IIT Delhi", response.getUniversityName());
        assertEquals("B.Tech Computer Science", response.getCourseDegree());
        assertEquals("2nd Year", response.getYearOfStudy());
        assertEquals("Applied AI", response.getTrack());
        assertEquals("PENDING", response.getPaymentStatus());
        assertNull(response.getRazorpayOrderId());
        assertEquals("Registration successful. Your Rote2Real profile has been saved.", response.getMessage());
        ArgumentCaptor<Rote2RealStudent> studentCaptor = ArgumentCaptor.forClass(Rote2RealStudent.class);
        verify(studentRepository).save(studentCaptor.capture());
        Rote2RealStudent persistedStudent = studentCaptor.getValue();
        assertEquals("Aisha Khan", persistedStudent.getName());
        assertEquals("aisha@example.com", persistedStudent.getEmail());
        assertEquals("9876543210", persistedStudent.getPhone());
        assertEquals("India", persistedStudent.getCountry());
        assertEquals("IIT Delhi", persistedStudent.getUniversityName());
        assertEquals("B.Tech Computer Science", persistedStudent.getCourseDegree());
        assertEquals("2nd Year", persistedStudent.getYearOfStudy());
        assertEquals("Applied AI", persistedStudent.getTrack());
        verifyNoInteractions(razorpayClient);
    }

    @Test
    @DisplayName("Duplicate email registration is rejected")
    void testRegisterStudentRejectsDuplicateEmail() {
        Rote2RealRegisterRequest request = Rote2RealRegisterRequest.builder()
                .name("Existing Student")
                .email("dup@example.com")
                .country("India")
                .phone("9999999999")
                .universityName("NIT Trichy")
                .courseDegree("MBA")
                .yearOfStudy("1st Year")
                .track("Generative AI")
                .build();

        when(studentRepository.findByEmail("dup@example.com")).thenReturn(Optional.of(new Rote2RealStudent()));

        IllegalStateException ex = assertThrows(IllegalStateException.class,
                () -> rote2RealService.registerStudent(request));

        assertTrue(ex.getMessage().contains("already exists"));
        verify(studentRepository, never()).save(any(Rote2RealStudent.class));
    }

    // =========================================================================
    // 2. EXERCISE TESTS
    // =========================================================================

    @Test
    @DisplayName("Fetch exercises with student submission mapping")
    void testGetExercises() {
        Rote2RealExercise ex1 = new Rote2RealExercise();
        ex1.setId(1L);
        ex1.setDayNumber(1);
        ex1.setTitle("Day 1 Exercise");
        ex1.setDescription("Desc 1");
        ex1.setCategory("reflection");
        ex1.setRequiresEvidence(true);
        ex1.setIsActive(true);

        when(exerciseRepository.findAllByOrderByDayNumberAsc()).thenReturn(List.of(ex1));

        Rote2RealStudent student = new Rote2RealStudent();
        student.setId(1L);

        Rote2RealSubmission sub = new Rote2RealSubmission();
        sub.setId(10L);
        sub.setStudent(student);
        sub.setExercise(ex1);
        sub.setStatus("COMPLETED");
        sub.setEvidenceText("Completed reflection text");

        when(submissionRepository.findByStudentId(1L)).thenReturn(List.of(sub));

        List<Rote2RealExerciseResponse> responses = rote2RealService.getExercises(1L);

        assertEquals(1, responses.size());
        assertEquals("COMPLETED", responses.get(0).getSubmissionStatus());
        assertEquals("Completed reflection text", responses.get(0).getEvidenceText());
    }

    // =========================================================================
    // 3. SUBMISSION TESTS
    // =========================================================================

    @Test
    @DisplayName("Submit evidence fails if student has not paid")
    void testSubmitEvidenceFailsWhenUnpaid() {
        Rote2RealStudent student = new Rote2RealStudent();
        student.setId(1L);
        student.setPaymentStatus("PENDING");

        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));

        Rote2RealSubmissionRequest req = Rote2RealSubmissionRequest.builder()
                .exerciseId(1L)
                .evidenceText("Evidence")
                .build();

        assertThrows(RuntimeException.class, () -> rote2RealService.submitEvidence(1L, req));
    }

    @Test
    @DisplayName("Submit evidence successfully for paid student")
    void testSubmitEvidenceSuccess() {
        Rote2RealStudent student = new Rote2RealStudent();
        student.setId(1L);
        student.setPaymentStatus("PAID");

        Rote2RealExercise exercise = new Rote2RealExercise();
        exercise.setId(2L);
        exercise.setDayNumber(2);
        exercise.setTitle("Day 2 Exercise");
        exercise.setCategory("build");
        exercise.setRequiresEvidence(true);

        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));
        when(exerciseRepository.findById(2L)).thenReturn(Optional.of(exercise));
        when(submissionRepository.findByStudentIdAndExerciseId(1L, 2L)).thenReturn(Optional.empty());

        when(submissionRepository.save(any(Rote2RealSubmission.class))).thenAnswer(invocation -> {
            Rote2RealSubmission s = invocation.getArgument(0);
            s.setId(201L);
            return s;
        });

        Rote2RealSubmissionRequest req = Rote2RealSubmissionRequest.builder()
                .exerciseId(2L)
                .evidenceUrl("https://github.com/braintrain/my-repo")
                .qualityScore(9)
                .build();

        Rote2RealSubmissionResponse resp = rote2RealService.submitEvidence(1L, req);

        assertNotNull(resp);
        assertEquals("COMPLETED", resp.getStatus());
        assertEquals("https://github.com/braintrain/my-repo", resp.getEvidenceUrl());
        assertEquals(9, resp.getQualityScore());
    }

    // =========================================================================
    // 4. PROGRESS TESTS
    // =========================================================================

    @Test
    @DisplayName("Calculate student progress percentage and category breakdown")
    void testGetStudentProgress() {
        Rote2RealStudent student = new Rote2RealStudent();
        student.setId(1L);
        student.setName("Student Test");
        student.setEmail("test@student.com");

        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));

        List<Rote2RealExercise> exercises = new ArrayList<>();
        for (int i = 1; i <= 20; i++) {
            Rote2RealExercise ex = new Rote2RealExercise();
            ex.setId((long) i);
            ex.setDayNumber(i);
            ex.setCategory(i <= 10 ? "build" : "reflection");
            exercises.add(ex);
        }
        when(exerciseRepository.findAllByOrderByDayNumberAsc()).thenReturn(exercises);

        List<Rote2RealSubmission> submissions = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            Rote2RealSubmission sub = new Rote2RealSubmission();
            sub.setId((long) (100 + i));
            sub.setStudent(student);
            sub.setExercise(exercises.get(i - 1));
            sub.setStatus("COMPLETED");
            sub.setSubmittedAt(LocalDateTime.now().minusDays(10 - i));
            submissions.add(sub);
        }
        when(submissionRepository.findByStudentId(1L)).thenReturn(submissions);

        Rote2RealProgressResponse progress = rote2RealService.getStudentProgress(1L);

        assertNotNull(progress);
        assertEquals(20, progress.getTotalExercises());
        assertEquals(10, progress.getCompletedExercises());
        assertEquals(10, progress.getPendingExercises());
        assertEquals(new BigDecimal("50.00"), progress.getCompletionPercentage());
        assertEquals(10, progress.getCategoryProgress().get("build"));
        assertEquals(0, progress.getCategoryProgress().get("reflection"));
    }

    // =========================================================================
    // 5. EVALUATION & FINAL REPORT TESTS
    // =========================================================================

    @Test
    @DisplayName("Evaluate student achieving GOLD tier (100% completion, high score)")
    void testEvaluateGoldTier() {
        Rote2RealStudent student = new Rote2RealStudent();
        student.setId(1L);
        student.setName("Gold Winner");
        student.setEmail("gold@test.com");
        student.setCountry("India");
        student.setIsInternational(false);

        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));

        List<Rote2RealExercise> exercises = new ArrayList<>();
        for (int i = 1; i <= 20; i++) {
            Rote2RealExercise ex = new Rote2RealExercise();
            ex.setId((long) i);
            ex.setDayNumber(i);
            ex.setTitle("Day " + i);
            ex.setCategory("build");
            exercises.add(ex);
        }
        when(exerciseRepository.findAllByOrderByDayNumberAsc()).thenReturn(exercises);

        List<Rote2RealSubmission> submissions = new ArrayList<>();
        for (int i = 1; i <= 20; i++) {
            Rote2RealSubmission sub = new Rote2RealSubmission();
            sub.setId((long) (200 + i));
            sub.setStudent(student);
            sub.setExercise(exercises.get(i - 1));
            sub.setStatus("COMPLETED");
            sub.setQualityScore(9); // 90% evidence score
            sub.setSubmittedAt(LocalDateTime.now().minusDays(20 - i));
            submissions.add(sub);
        }
        when(submissionRepository.findByStudentId(1L)).thenReturn(submissions);
        when(classificationRepository.findByStudentId(1L)).thenReturn(Optional.empty());

        Rote2RealReportResponse report = rote2RealService.evaluateAndGenerateReport(1L);

        assertNotNull(report);
        assertEquals(20, report.getCompletedExercises());
        assertEquals(new BigDecimal("100.00"), report.getCompletionPercentage());
        assertEquals("GOLD", report.getAchievementLevel());
        assertTrue(report.getFinalScore().compareTo(new BigDecimal("85.00")) >= 0);
        verify(classificationRepository).save(any(Rote2RealClassification.class));
    }

    @Test
    @DisplayName("Evaluate student below thresholds receives INCOMPLETE")
    void testEvaluateIncomplete() {
        Rote2RealStudent student = new Rote2RealStudent();
        student.setId(2L);
        student.setName("Partial Student");
        student.setEmail("partial@test.com");
        student.setCountry("India");
        student.setIsInternational(false);

        when(studentRepository.findById(2L)).thenReturn(Optional.of(student));

        List<Rote2RealExercise> exercises = new ArrayList<>();
        for (int i = 1; i <= 20; i++) {
            Rote2RealExercise ex = new Rote2RealExercise();
            ex.setId((long) i);
            ex.setDayNumber(i);
            ex.setTitle("Day " + i);
            ex.setCategory("build");
            exercises.add(ex);
        }
        when(exerciseRepository.findAllByOrderByDayNumberAsc()).thenReturn(exercises);

        // Only 5 exercises completed (25% completion < 50% bronze threshold)
        List<Rote2RealSubmission> submissions = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            Rote2RealSubmission sub = new Rote2RealSubmission();
            sub.setId((long) (300 + i));
            sub.setStudent(student);
            sub.setExercise(exercises.get(i - 1));
            sub.setStatus("COMPLETED");
            sub.setQualityScore(7);
            submissions.add(sub);
        }
        when(submissionRepository.findByStudentId(2L)).thenReturn(submissions);
        when(classificationRepository.findByStudentId(2L)).thenReturn(Optional.empty());

        Rote2RealReportResponse report = rote2RealService.evaluateAndGenerateReport(2L);

        assertNotNull(report);
        assertEquals(5, report.getCompletedExercises());
        assertEquals(new BigDecimal("25.00"), report.getCompletionPercentage());
        assertEquals("INCOMPLETE", report.getAchievementLevel());
    }
}
