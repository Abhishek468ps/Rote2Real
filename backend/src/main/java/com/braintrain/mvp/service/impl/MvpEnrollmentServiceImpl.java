package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.dto.request.CreateMvpEnrollmentRequest;
import com.braintrain.mvp.dto.response.MvpEnrollmentResponse;
import com.braintrain.mvp.entity.Mvp;
import com.braintrain.mvp.entity.MvpEnrollment;
import com.braintrain.mvp.entity.MvpPlan;
import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.enums.MvpEnrollmentStatus;
import com.braintrain.mvp.enums.MvpPaymentStatus;
import com.braintrain.mvp.repository.MvpEnrollmentRepository;
import com.braintrain.mvp.repository.MvpPlanRepository;
import com.braintrain.mvp.repository.MvpRepository;
import com.braintrain.mvp.repository.UserRepository;
import com.braintrain.mvp.service.GithubRepositoryService;
import com.braintrain.mvp.service.MvpEnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MvpEnrollmentServiceImpl
        implements MvpEnrollmentService {

    private final MvpEnrollmentRepository enrollmentRepository;

    private final UserRepository userRepository;

    private final MvpRepository mvpRepository;

    private final MvpPlanRepository planRepository;

    private final GithubRepositoryService githubRepositoryService;

    // ==========================================================
    // ENROLL
    // ==========================================================

    @Override
    public MvpEnrollmentResponse enroll(
            Long userId,
            CreateMvpEnrollmentRequest request
    ) {

        if (request == null) {
        throw new RuntimeException(
                "Enrollment request is required"
        );
    }

        if (request.getMvpId() == null) {

            throw new RuntimeException(
                    "MVP ID is required"
            );
        }

        if (request.getPlanId() == null) {

            throw new RuntimeException(
                    "Plan ID is required"
            );
        }

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        Mvp mvp =
                mvpRepository.findById(
                        request.getMvpId()
                ).orElseThrow(() ->
                        new RuntimeException(
                                "MVP not found"
                        )
                );

        MvpPlan plan =
                planRepository
                        .findByIdAndMvpId(
                                request.getPlanId(),
                                request.getMvpId()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Plan does not belong to this MVP"
                                )
                        );

        // ======================================================
        // CHECK DUPLICATE
        // ======================================================

        // ======================================================
// CHECK EXISTING ENROLLMENT
// ======================================================

var existingEnrollment =
        enrollmentRepository
                .findByUserIdAndMvpIdAndPlanId(
                        userId,
                        mvp.getId(),
                        plan.getId()
                );

       if (existingEnrollment.isPresent()) {

    MvpEnrollment existing =
            existingEnrollment.get();

// ------------------------------------------------------
        // ALREADY IN PROGRESS
        // ------------------------------------------------------

        if (existing.getStatus()
                == MvpEnrollmentStatus.IN_PROGRESS) {

            return mapToResponse(existing);
        }

    if (existing.getPaymentStatus() ==
            MvpPaymentStatus.NOT_REQUIRED) {

        if (existing.getStartedAt() == null) {
            activateEnrollment(existing);
        }

        return mapToResponse(existing);
    }

    // --------------------------------------------------
    // Paid enrollment already completed
    // --------------------------------------------------

    if (existing.getPaymentStatus() ==
            MvpPaymentStatus.PAID) {

        if (existing.getStartedAt() == null) {
            activateEnrollment(existing);
        }

        return mapToResponse(existing);
    }

// ------------------------------------------------------
        // PAYMENT STILL PENDING
        // ------------------------------------------------------

        if (existing.getPaymentStatus()
                == MvpPaymentStatus.PENDING) {

            return mapToResponse(existing);
        }

          // ------------------------------------------------------
        // FALLBACK
        // ------------------------------------------------------

        return mapToResponse(existing);
    }
   
   // ======================================================
        // CREATE ENROLLMENT
        // ======================================================

        MvpEnrollment enrollment =
                new MvpEnrollment();

        enrollment.setUser(user);

        enrollment.setMvp(mvp);

        enrollment.setPlan(plan);

        // ======================================================
        // FREE / PAID
        // ======================================================
  boolean isFreePlan =
            plan.isFree()
                    || plan.getPrice() == null
                    || plan.getPrice().signum() == 0;

    if (isFreePlan) {

        enrollment.setPaymentStatus(
                MvpPaymentStatus.NOT_REQUIRED
        );

        enrollment.setStatus(
                MvpEnrollmentStatus.READY_TO_START
        );

    } else {

        enrollment.setPaymentStatus(
                MvpPaymentStatus.PENDING
        );

        enrollment.setStatus(
                MvpEnrollmentStatus.PAYMENT_PENDING
        );
    }

        enrollment.setProgressPercentage(0);

        enrollment.setCompletedTasks(0);

        enrollment.setTotalTasks(0);

        MvpEnrollment saved =
                enrollmentRepository.save(
                        enrollment
                );

        // ==========================================================
    // FREE PLAN STARTS IMMEDIATELY
    // ==========================================================

    if (isFreePlan) {

        activateEnrollment(saved);
    }

    // ==========================================================
    // RESPONSE
    // ==========================================================

    return mapToResponse(saved);
}

    // ==========================================================
    // MY ENROLLMENTS
    // ==========================================================

    @Override
    @Transactional(readOnly = true)
    public List<MvpEnrollmentResponse> getMyEnrollments(
            Long userId
    ) {

        return enrollmentRepository
                .findByUserIdOrderByCreatedAtDesc(
                        userId
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ==========================================================
    // GET SINGLE
    // ==========================================================

    @Override
    @Transactional(readOnly = true)
    public MvpEnrollmentResponse getMyEnrollment(
            Long userId,
            Long enrollmentId
    ) {

        MvpEnrollment enrollment =
                enrollmentRepository
                        .findById(enrollmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Enrollment not found"
                                )
                        );

        if (!enrollment.getUser()
                .getId()
                .equals(userId)) {

            throw new RuntimeException(
                    "You are not allowed to access this enrollment"
            );
        }

        
        return mapToResponse(
                enrollment
        );
    }

    // ==========================================================
    // START
    // ==========================================================

    @Override
    public MvpEnrollmentResponse startEnrollment(
            Long userId,
            Long enrollmentId
    ) {

        MvpEnrollment enrollment =
                enrollmentRepository
                        .findById(enrollmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Enrollment not found"
                                )
                        );

        if (!enrollment.getUser()
                .getId()
                .equals(userId)) {

            throw new RuntimeException(
                    "You are not allowed to start this enrollment"
            );
        }

        if (
                enrollment.getPaymentStatus()
                        != MvpPaymentStatus.NOT_REQUIRED
                        &&
                enrollment.getPaymentStatus()
                        != MvpPaymentStatus.PAID
        ) {

            throw new RuntimeException(
                    "Payment is required before starting this MVP"
            );
        }

        activateEnrollment(
                enrollment
        );

        return mapToResponse(
                enrollment
        );
    }

    // ==========================================================
    // ACTIVATE
    // ==========================================================

    private void activateEnrollment(
            MvpEnrollment enrollment
    ) {

        LocalDateTime start =
                LocalDateTime.now();

        LocalDateTime deadline =
                start.plusHours(
                        enrollment
                                .getPlan()
                                .getDurationHours()
                );

        enrollment.setStartedAt(
                start
        );

        enrollment.setDeadlineAt(
                deadline
        );

        enrollment.setStatus(
                MvpEnrollmentStatus.IN_PROGRESS
        );

        createGithubRepository(
                enrollment
        );

        enrollmentRepository.save(
                enrollment
        );
    }

    // ==========================================================
    // GITHUB
    // ==========================================================

    private void createGithubRepository(
            MvpEnrollment enrollment
    ) {

        if (
                enrollment.getGithubRepoUrl()
                        != null
                        &&
                !enrollment.getGithubRepoUrl()
                        .isBlank()
        ) {

            return;
        }

        String brainTrainId =
                enrollment
                        .getUser()
                        .getBraintrainId();

        if (
                brainTrainId == null
                        ||
                brainTrainId.isBlank()
        ) {

            brainTrainId =
                    "USER-" +
                    enrollment
                            .getUser()
                            .getId();
        }

        String mvpCode =
                enrollment
                        .getMvp()
                        .getMvpCode();

        String repoName =
                sanitize(
                        "BT-"
                                + mvpCode
                                + "-"
                                + brainTrainId
                                + "-"
                                + enrollment.getId()
                );

        String description =
                "Brain Train MVP: "
                        + enrollment
                        .getMvp()
                        .getTitle()
                        + " | "
                        + enrollment
                        .getPlan()
                        .getName();

        GithubRepositoryService
                .GithubRepositoryResult result =
                githubRepositoryService
                        .createRepository(
                                repoName,
                                description,
                                true
                        );

        enrollment.setGithubRepoName(
                result.name()
        );

        enrollment.setGithubRepoUrl(
                result.htmlUrl()
        );

        enrollment.setRepositoryUrl(
                result.cloneUrl()
        );

        enrollment.setGithubRepoCreatedAt(
                LocalDateTime.now()
        );
    }

    @Override
public MvpEnrollmentResponse activateAfterPayment(
        Long enrollmentId
) {

    MvpEnrollment enrollment =
            enrollmentRepository.findById(
                    enrollmentId
            ).orElseThrow(() ->
                    new RuntimeException(
                            "Enrollment not found"
                    )
            );

    if (enrollment.getPaymentStatus()
            != MvpPaymentStatus.PAID) {

        throw new RuntimeException(
                "Payment is not completed"
        );
    }

    if (enrollment.getStartedAt() == null) {

        activateEnrollment(
                enrollment
        );

    } else {

        createGithubRepository(
                enrollment
        );
    }

    return mapToResponse(
            enrollment
    );
}

    // ==========================================================
    // SANITIZE REPO NAME
    // ==========================================================

    private String sanitize(
            String value
    ) {

        return value
                .replaceAll(
                        "[^a-zA-Z0-9._-]",
                        "-"
                )
                .replaceAll(
                        "-+",
                        "-"
                )
                .replaceAll(
                        "^-|-$",
                        ""
                );
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
                enrollment.getUser()
                        .getId()
        );

        response.setMvpId(
                enrollment.getMvp()
                        .getId()
        );

        response.setMvpCode(
                enrollment.getMvp()
                        .getMvpCode()
        );

        response.setMvpTitle(
                enrollment.getMvp()
                        .getTitle()
        );

        response.setPlanId(
                enrollment.getPlan()
                        .getId()
        );

        response.setPlanCode(
                enrollment.getPlan()
                        .getCode()
        );

        response.setPlanName(
                enrollment.getPlan()
                        .getName()
        );

        response.setDurationHours(
                enrollment.getPlan()
                        .getDurationHours()
        );

        response.setPrice(
                enrollment.getPlan()
                        .getPrice()
        );

        response.setCurrency(
                enrollment.getPlan()
                        .getCurrency()
        );

        response.setFree(
                enrollment.getPlan()
                        .isFree()
        );

        response.setPaymentStatus(
                enrollment.getPaymentStatus()
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
                enrollment
                        .getXpEarned()
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
