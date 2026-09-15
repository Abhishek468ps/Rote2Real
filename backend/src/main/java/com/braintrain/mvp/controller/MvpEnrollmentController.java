package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.request.CreateMvpEnrollmentRequest;
import com.braintrain.mvp.dto.response.MvpEnrollmentResponse;
import com.braintrain.mvp.service.MvpEnrollmentService;
import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mvp/enrollments")
@RequiredArgsConstructor
public class MvpEnrollmentController {

   private final MvpEnrollmentService enrollmentService;
    private final UserRepository userRepository;

    // ==========================================================
    // ENROLL
    // ==========================================================

    @PostMapping
    public ResponseEntity<MvpEnrollmentResponse> enroll(
            Authentication authentication,
            @RequestBody CreateMvpEnrollmentRequest request
    ) {

        Long userId =
                extractUserId(authentication);

        return ResponseEntity.ok(
                enrollmentService.enroll(
                        userId,
                        request
                )
        );
    }

    // ==========================================================
    // MY ENROLLMENTS
    // ==========================================================

    @GetMapping("/my")
    public ResponseEntity<List<MvpEnrollmentResponse>>
    getMyEnrollments(
            Authentication authentication
    ) {

        Long userId =
                extractUserId(authentication);

        return ResponseEntity.ok(
                enrollmentService
                        .getMyEnrollments(userId)
        );
    }

    // ==========================================================
    // SINGLE ENROLLMENT
    // ==========================================================

    @GetMapping("/{id}")
    public ResponseEntity<MvpEnrollmentResponse>
    getEnrollment(
            Authentication authentication,
            @PathVariable Long id
    ) {

        Long userId =
                extractUserId(authentication);

        return ResponseEntity.ok(
                enrollmentService
                        .getMyEnrollment(
                                userId,
                                id
                        )
        );
    }

    // ==========================================================
    // START
    // ==========================================================

    @PostMapping("/{id}/start")
    public ResponseEntity<MvpEnrollmentResponse>
    startEnrollment(
            Authentication authentication,
            @PathVariable Long id
    ) {

        Long userId =
                extractUserId(authentication);

        return ResponseEntity.ok(
                enrollmentService
                        .startEnrollment(
                                userId,
                                id
                        )
        );
    }

    // ==========================================================
    // AUTHENTICATION
    // ==========================================================

    private Long extractUserId(
            Authentication authentication
    ) {

        if (authentication == null ||
                authentication.getName() == null ||
                authentication.getName().isBlank()) {

            throw new RuntimeException(
                    "Authenticated user could not be resolved"
            );
        }

        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Authenticated user not found"
                        )
                );

        return user.getId();
    }
}