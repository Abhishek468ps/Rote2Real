package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.response.MvpEnrollmentResponse;
import com.braintrain.mvp.dto.response.MvpModuleResponse;
import com.braintrain.mvp.dto.response.MvpTaskResponse;
import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.repository.UserRepository;
import com.braintrain.mvp.service.MvpEnrollmentService;
import com.braintrain.mvp.service.MvpModuleService;
import com.braintrain.mvp.service.MvpTaskService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mvp/workspace")
@RequiredArgsConstructor
public class StudentMvpWorkspaceController {

    private final MvpModuleService mvpModuleService;
    private final MvpTaskService mvpTaskService;
    private final MvpEnrollmentService mvpEnrollmentService;
    private final UserRepository userRepository;


    // =========================================================
    // 1. GET ALL MODULES FOR STUDENT WORKSPACE
    // =========================================================

    @GetMapping("/{mvpId}/modules")
    public ResponseEntity<List<MvpModuleResponse>> getModules(
            Authentication authentication,
            @PathVariable Long mvpId,
            @RequestParam Long enrollmentId
    ) {

        Long userId = extractUserId(authentication);

        /*
         * Verify:
         *
         * 1. Enrollment exists
         * 2. Enrollment belongs to logged-in student
         * 3. Enrollment belongs to requested MVP
         * 4. Payment is valid
         * 5. Workspace is active
         */
        MvpEnrollmentResponse enrollment =
                validateEnrollment(
                        userId,
                        enrollmentId,
                        mvpId
                );

        /*
         * Fetch modules belonging to this MVP.
         */
        List<MvpModuleResponse> modules =
                mvpModuleService.getModulesByMvp(mvpId);

        return ResponseEntity.ok(modules);
    }


    // =========================================================
    // 2. GET ALL TASKS FOR A MODULE
    // =========================================================

    @GetMapping("/modules/{moduleId}/tasks")
    public ResponseEntity<List<MvpTaskResponse>> getTasks(
            Authentication authentication,
            @PathVariable Long moduleId,
            @RequestParam Long enrollmentId
    ) {

        Long userId = extractUserId(authentication);

        /*
         * First get the student's enrollment.
         *
         * This automatically checks that the enrollment
         * belongs to the logged-in student because
         * MvpEnrollmentService.getMyEnrollment()
         * performs ownership validation.
         */
        MvpEnrollmentResponse enrollment =
                mvpEnrollmentService.getMyEnrollment(
                        userId,
                        enrollmentId
                );

        /*
         * Validate payment and workspace status.
         */
        validateWorkspaceStatus(enrollment);

        /*
         * Get the module.
         *
         * MvpModuleService already has getModule().
         */
        MvpModuleResponse module =
                mvpModuleService.getModule(moduleId);

        /*
         * Make sure this module belongs to
         * the student's enrolled MVP.
         */
        if (module.getMvpId() == null ||
                !module.getMvpId().equals(enrollment.getMvpId())) {

            throw new RuntimeException(
                    "This module does not belong to your enrolled MVP"
            );
        }

        /*
         * Now safely fetch the tasks.
         */
        List<MvpTaskResponse> tasks =
                mvpTaskService.getTasksByModule(moduleId);

        return ResponseEntity.ok(tasks);
    }


    // =========================================================
    // 3. EXTRACT LOGGED-IN USER ID
    // =========================================================

    private Long extractUserId(
            Authentication authentication
    ) {

        if (authentication == null) {
            throw new RuntimeException(
                    "Authentication is required"
            );
        }

        if (authentication.getName() == null ||
                authentication.getName().isBlank()) {

            throw new RuntimeException(
                    "Authenticated user could not be resolved"
            );
        }

        /*
         * Your JWT authentication uses email
         * as Authentication.getName().
         */
        String email = authentication.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Authenticated user not found"
                                )
                        );

        return user.getId();
    }


    // =========================================================
    // 4. VALIDATE ENROLLMENT
    // =========================================================

    private MvpEnrollmentResponse validateEnrollment(
            Long userId,
            Long enrollmentId,
            Long mvpId
    ) {

        /*
         * getMyEnrollment() already verifies that
         * this enrollment belongs to the logged-in user.
         */
        MvpEnrollmentResponse enrollment =
                mvpEnrollmentService.getMyEnrollment(
                        userId,
                        enrollmentId
                );


        // -----------------------------------------------------
        // Check MVP
        // -----------------------------------------------------

        if (enrollment.getMvpId() == null ||
                !enrollment.getMvpId().equals(mvpId)) {

            throw new RuntimeException(
                    "This enrollment does not belong to this MVP"
            );
        }


        // -----------------------------------------------------
        // Check payment
        // -----------------------------------------------------

        validateWorkspaceStatus(enrollment);

        return enrollment;
    }


    // =========================================================
    // 5. VALIDATE PAYMENT + WORKSPACE STATUS
    // =========================================================

    private void validateWorkspaceStatus(
            MvpEnrollmentResponse enrollment
    ) {

        String paymentStatus =
                enrollment.getPaymentStatus();

        String enrollmentStatus =
                enrollment.getEnrollmentStatus();


        // -----------------------------------------------------
        // Payment validation
        // -----------------------------------------------------

        boolean paymentValid =
                "PAID".equalsIgnoreCase(paymentStatus)
                ||
                "NOT_REQUIRED".equalsIgnoreCase(paymentStatus);

        if (!paymentValid) {

            throw new RuntimeException(
                    "Payment is required before accessing this workspace"
            );
        }


        // -----------------------------------------------------
        // Workspace activation validation
        // -----------------------------------------------------

        boolean workspaceActive =
                "IN_PROGRESS".equalsIgnoreCase(enrollmentStatus)
                ||
                "COMPLETED".equalsIgnoreCase(enrollmentStatus);

        if (!workspaceActive) {

            throw new RuntimeException(
                    "MVP workspace is not active"
            );
        }
    }
}