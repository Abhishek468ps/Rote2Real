package com.braintrain.mvp.service;

import com.braintrain.mvp.entity.Mvp;
import com.braintrain.mvp.entity.MvpEnrollment;
import com.braintrain.mvp.entity.MvpPlan;
import com.braintrain.mvp.entity.User;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class GithubRepositoryGenerator {

    private final GithubRepositoryService githubRepositoryService;

    /**
     * Creates GitHub repository for an MVP enrollment.
     *
     * Repository format:
     *
     * BT-{BrainTrainId}-{MvpCode}-{PlanCode}
     *
     * Example:
     *
     * BT-BT20260045-SD-001-MVP-30D
     */
    @Transactional
    public void generateRepository(
            MvpEnrollment enrollment
    ) {

        if (enrollment == null) {
            throw new IllegalArgumentException(
                    "MVP enrollment cannot be null"
            );
        }

        if (enrollment.getUser() == null) {
            throw new IllegalStateException(
                    "Student is missing from MVP enrollment"
            );
        }

        if (enrollment.getMvp() == null) {
            throw new IllegalStateException(
                    "MVP is missing from enrollment"
            );
        }

        if (enrollment.getPlan() == null) {
            throw new IllegalStateException(
                    "MVP plan is missing from enrollment"
            );
        }

        /*
         * Prevent duplicate repository creation.
         *
         * Payment callbacks/webhooks can sometimes
         * be received more than once.
         */
        if (enrollment.getGithubRepoUrl() != null
                && !enrollment.getGithubRepoUrl().isBlank()) {

            return;
        }

        User user = enrollment.getUser();

        Mvp mvp = enrollment.getMvp();

        MvpPlan plan = enrollment.getPlan();

        String repositoryName =
                generateRepositoryName(
                        user,
                        mvp,
                        plan
                );

        String description =
                generateRepositoryDescription(
                        user,
                        mvp,
                        plan
                );

        GithubRepositoryService.GithubRepositoryResult result =
                githubRepositoryService.createRepository(
                        repositoryName,
                        description,
                        false
                );

        /*
         * Save GitHub repository information.
         */

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


    /**
     * Generates unique repository name.
     *
     * Format:
     *
     * BT-{BrainTrainId}-{MvpCode}-{PlanCode}
     */
    private String generateRepositoryName(
            User user,
            Mvp mvp,
            MvpPlan plan
    ) {

        String braintrainId =
                sanitize(
                        user.getBraintrainId()
                );

        String mvpCode =
                sanitize(
                        mvp.getMvpCode()
                );

        String planCode =
                sanitize(
                        plan.getCode()
                );

        /*
         * Fallback for old users
         * who don't have BrainTrain ID.
         */
        if (braintrainId == null
                || braintrainId.isBlank()) {

            braintrainId =
                    "USER-" + user.getId();
        }

        /*
         * Fallback if MVP code is missing.
         */
        if (mvpCode == null
                || mvpCode.isBlank()) {

            mvpCode =
                    "MVP-" + mvp.getId();
        }

        /*
         * Fallback if plan code is missing.
         */
        if (planCode == null
                || planCode.isBlank()) {

            planCode =
                    "PLAN-" + plan.getId();
        }

        return "BT-"
                + braintrainId
                + "-"
                + mvpCode
                + "-"
                + planCode;
    }


    /**
     * Generates GitHub repository description.
     */
    private String generateRepositoryDescription(
            User user,
            Mvp mvp,
            MvpPlan plan
    ) {

        String studentName =
                user.getFullName() != null
                        ? user.getFullName()
                        : "Student";

        String mvpTitle =
                mvp.getTitle() != null
                        ? mvp.getTitle()
                        : "MVP Project";

        String planName =
                plan.getName() != null
                        ? plan.getName()
                        : "MVP Plan";

        return "BrainTrain MVP Project | "
                + mvpTitle
                + " | Student: "
                + studentName
                + " | Plan: "
                + planName;
    }


    /**
     * Makes repository values GitHub-safe.
     */
    private String sanitize(String value) {

        if (value == null) {
            return null;
        }

        String sanitized =
                value
                        .trim()
                        .replaceAll(
                                "[^a-zA-Z0-9._-]",
                                "-"
                        )
                        .replaceAll(
                                "-+",
                                "-"
                        );

        return sanitized;
    }
}