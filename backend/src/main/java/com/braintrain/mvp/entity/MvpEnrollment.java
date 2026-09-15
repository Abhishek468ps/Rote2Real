package com.braintrain.mvp.entity;

import com.braintrain.mvp.enums.MvpEnrollmentStatus;
import com.braintrain.mvp.enums.MvpPaymentStatus;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "mvp_enrollments",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uq_mvp_enrollment_user_mvp_plan",
                        columnNames = {
                                "user_id",
                                "mvp_id",
                                "plan_id"
                        }
                )
        }
)
public class MvpEnrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==============================
    // STUDENT
    // ==============================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;

    // ==============================
    // MVP
    // ==============================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "mvp_id",
            nullable = false
    )
    private Mvp mvp;

    // ==============================
    // PLAN
    // ==============================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "plan_id",
            nullable = false
    )
    private MvpPlan plan;

    // ==============================
    // PAYMENT
    // ==============================

    @Enumerated(EnumType.STRING)
@Column(name = "payment_status", nullable = false)
private MvpPaymentStatus paymentStatus = MvpPaymentStatus.PENDING;

@Column(name = "razorpay_order_id")
private String razorpayOrderId;

@Column(name = "razorpay_payment_id")
private String razorpayPaymentId;

    // ==============================
    // ENROLLMENT STATUS
    // ==============================

    @Enumerated(EnumType.STRING)
    @Column(
            name = "enrollment_status",
            nullable = false,
            length = 40
    )
private MvpEnrollmentStatus status =
        MvpEnrollmentStatus.PAYMENT_PENDING;

    // ==============================
    // DATES
    // ==============================

    @Column(name = "started_at")
    private LocalDateTime startedAt;

    @Column(name = "deadline_at")
    private LocalDateTime deadlineAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    // ==============================
    // PROGRESS
    // ==============================

    @Column(
            name = "progress_percentage",
            nullable = false
    )
    private Integer progressPercentage = 0;

    @Column(
            name = "completed_tasks",
            nullable = false
    )
    private Integer completedTasks = 0;

    @Column(
            name = "total_tasks",
            nullable = false
    )
    private Integer totalTasks = 0;

    // ==============================
    // GITHUB
    // ==============================

    @Column(name = "github_repo_name")
    private String githubRepoName;

    @Column(name = "github_repo_url")
    private String githubRepoUrl;

    @Column(name = "github_repo_created_at")
    private LocalDateTime githubRepoCreatedAt;

    // ==============================
    // PROJECT
    // ==============================

    @Column(name = "live_demo_url")
    private String liveDemoUrl;

    @Column(name = "repository_url")
    private String repositoryUrl;

    @Column(name = "final_submission_url")
    private String finalSubmissionUrl;

    // ==============================
    // SCORE / XP
    // ==============================

    @Column(name = "score")
    private BigDecimal score;

    @Column(
            name = "xp_earned",
            nullable = false
    )
    private Integer xpEarned = 0;

    // ==============================
    // TEAM
    // ==============================

    @Column(name = "team_id")
    private Long teamId;

    // ==============================
    // AUDIT
    // ==============================

    @Column(
            name = "created_at",
            nullable = false
    )
    private LocalDateTime createdAt;

    @Column(
            name = "updated_at",
            nullable = false
    )
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {

        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;

        if (progressPercentage == null) {
            progressPercentage = 0;
        }

        if (completedTasks == null) {
            completedTasks = 0;
        }

        if (totalTasks == null) {
            totalTasks = 0;
        }

        if (xpEarned == null) {
            xpEarned = 0;
        }
    }

    @PreUpdate
    public void preUpdate() {

        updatedAt = LocalDateTime.now();
    }

    // ==============================
    // GETTERS / SETTERS
    // ==============================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Mvp getMvp() {
        return mvp;
    }

    public void setMvp(Mvp mvp) {
        this.mvp = mvp;
    }

    public MvpPlan getPlan() {
        return plan;
    }

    public void setPlan(MvpPlan plan) {
        this.plan = plan;
    }

    public MvpPaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(MvpPaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getRazorpayOrderId() {
    return razorpayOrderId;
}

public void setRazorpayOrderId(String razorpayOrderId) {
    this.razorpayOrderId = razorpayOrderId;
}

public String getRazorpayPaymentId() {
    return razorpayPaymentId;
}

public void setRazorpayPaymentId(String razorpayPaymentId) {
    this.razorpayPaymentId = razorpayPaymentId;
}

  public MvpEnrollmentStatus getStatus() {
    return status;
}

public void setStatus(MvpEnrollmentStatus status) {
    this.status = status;
}

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public LocalDateTime getDeadlineAt() {
        return deadlineAt;
    }

    public void setDeadlineAt(LocalDateTime deadlineAt) {
        this.deadlineAt = deadlineAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public Integer getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(
            Integer progressPercentage
    ) {
        this.progressPercentage = progressPercentage;
    }

    public Integer getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(Integer completedTasks) {
        this.completedTasks = completedTasks;
    }

    public Integer getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(Integer totalTasks) {
        this.totalTasks = totalTasks;
    }

    public String getGithubRepoName() {
        return githubRepoName;
    }

    public void setGithubRepoName(String githubRepoName) {
        this.githubRepoName = githubRepoName;
    }

    public String getGithubRepoUrl() {
        return githubRepoUrl;
    }

    public void setGithubRepoUrl(String githubRepoUrl) {
        this.githubRepoUrl = githubRepoUrl;
    }

    public LocalDateTime getGithubRepoCreatedAt() {
        return githubRepoCreatedAt;
    }

    public void setGithubRepoCreatedAt(
            LocalDateTime githubRepoCreatedAt
    ) {
        this.githubRepoCreatedAt = githubRepoCreatedAt;
    }

    public String getLiveDemoUrl() {
        return liveDemoUrl;
    }

    public void setLiveDemoUrl(String liveDemoUrl) {
        this.liveDemoUrl = liveDemoUrl;
    }

    public String getRepositoryUrl() {
        return repositoryUrl;
    }

    public void setRepositoryUrl(String repositoryUrl) {
        this.repositoryUrl = repositoryUrl;
    }

    public String getFinalSubmissionUrl() {
        return finalSubmissionUrl;
    }

    public void setFinalSubmissionUrl(
            String finalSubmissionUrl
    ) {
        this.finalSubmissionUrl = finalSubmissionUrl;
    }

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }

    public Integer getXpEarned() {
        return xpEarned;
    }

    public void setXpEarned(Integer xpEarned) {
        this.xpEarned = xpEarned;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
