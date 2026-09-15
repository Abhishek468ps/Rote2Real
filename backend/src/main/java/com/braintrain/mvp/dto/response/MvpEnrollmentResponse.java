package com.braintrain.mvp.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class MvpEnrollmentResponse {

    private Long id;

    private Long userId;

    private Long mvpId;

    private String mvpCode;

    private String mvpTitle;

    private Long planId;

    private String planCode;

    private String planName;

    private Integer durationHours;

    private BigDecimal price;

    private String currency;

    private boolean free;

    private String paymentStatus;

    private String enrollmentStatus;

    private LocalDateTime startedAt;

    private LocalDateTime deadlineAt;

    private LocalDateTime completedAt;

    private Integer progressPercentage;

    private Integer completedTasks;

    private Integer totalTasks;

    private String githubRepoName;

    private String githubRepoUrl;

    private LocalDateTime githubRepoCreatedAt;

    private String liveDemoUrl;

    private String repositoryUrl;

    private String finalSubmissionUrl;

    private BigDecimal score;

    private Integer xpEarned;

    private Long teamId;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // ==============================
    // GETTERS / SETTERS
    // ==============================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getMvpId() {
        return mvpId;
    }

    public void setMvpId(Long mvpId) {
        this.mvpId = mvpId;
    }

    public String getMvpCode() {
        return mvpCode;
    }

    public void setMvpCode(String mvpCode) {
        this.mvpCode = mvpCode;
    }

    public String getMvpTitle() {
        return mvpTitle;
    }

    public void setMvpTitle(String mvpTitle) {
        this.mvpTitle = mvpTitle;
    }

    public Long getPlanId() {
        return planId;
    }

    public void setPlanId(Long planId) {
        this.planId = planId;
    }

    public String getPlanCode() {
        return planCode;
    }

    public void setPlanCode(String planCode) {
        this.planCode = planCode;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public Integer getDurationHours() {
        return durationHours;
    }

    public void setDurationHours(Integer durationHours) {
        this.durationHours = durationHours;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public boolean isFree() {
        return free;
    }

    public void setFree(boolean free) {
        this.free = free;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getEnrollmentStatus() {
        return enrollmentStatus;
    }

    public void setEnrollmentStatus(
            String enrollmentStatus
    ) {
        this.enrollmentStatus = enrollmentStatus;
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

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}