package com.braintrain.mvp.dto.response;

import com.braintrain.mvp.enums.MvpDifficulty;
import com.braintrain.mvp.enums.MvpStatus;

import java.time.LocalDateTime;

public class MvpResponse {

    private Long id;

    private String mvpCode;

    private String title;

    private String slug;

    private String shortDescription;

    private String description;

    private MvpDomainResponse domain;

    private String category;

    private MvpDifficulty difficulty;

    private String prerequisites;

    private String learningOutcomes;

    private String deliverables;

    private Integer estimatedHours;

    private Integer minTeamSize;

    private Integer maxTeamSize;

    private boolean teamAllowed;

    private Integer rewardXp;

    private boolean certificateEnabled;

    private boolean portfolioEnabled;

    private boolean mentorEnabled;

    private boolean aiMentorEnabled;

    private boolean featured;

    private MvpStatus status;

    private Long ownerId;

    private String ownerName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime publishedAt;

    private LocalDateTime completedAt;


    public MvpResponse() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMvpCode() {
        return mvpCode;
    }

    public void setMvpCode(
            String mvpCode
    ) {
        this.mvpCode = mvpCode;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(
            String title
    ) {
        this.title = title;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(
            String slug
    ) {
        this.slug = slug;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(
            String shortDescription
    ) {
        this.shortDescription =
                shortDescription;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(
            String description
    ) {
        this.description =
                description;
    }

    public MvpDomainResponse getDomain() {
        return domain;
    }

    public void setDomain(
            MvpDomainResponse domain
    ) {
        this.domain = domain;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(
            String category
    ) {
        this.category = category;
    }

    public MvpDifficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(
            MvpDifficulty difficulty
    ) {
        this.difficulty =
                difficulty;
    }

    public String getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(
            String prerequisites
    ) {
        this.prerequisites =
                prerequisites;
    }

    public String getLearningOutcomes() {
        return learningOutcomes;
    }

    public void setLearningOutcomes(
            String learningOutcomes
    ) {
        this.learningOutcomes =
                learningOutcomes;
    }

    public String getDeliverables() {
        return deliverables;
    }

    public void setDeliverables(
            String deliverables
    ) {
        this.deliverables =
                deliverables;
    }

    public Integer getEstimatedHours() {
        return estimatedHours;
    }

    public void setEstimatedHours(
            Integer estimatedHours
    ) {
        this.estimatedHours =
                estimatedHours;
    }

    public Integer getMinTeamSize() {
        return minTeamSize;
    }

    public void setMinTeamSize(
            Integer minTeamSize
    ) {
        this.minTeamSize =
                minTeamSize;
    }

    public Integer getMaxTeamSize() {
        return maxTeamSize;
    }

    public void setMaxTeamSize(
            Integer maxTeamSize
    ) {
        this.maxTeamSize =
                maxTeamSize;
    }

    public boolean isTeamAllowed() {
        return teamAllowed;
    }

    public void setTeamAllowed(
            boolean teamAllowed
    ) {
        this.teamAllowed =
                teamAllowed;
    }

    public Integer getRewardXp() {
        return rewardXp;
    }

    public void setRewardXp(
            Integer rewardXp
    ) {
        this.rewardXp =
                rewardXp;
    }

    public boolean isCertificateEnabled() {
        return certificateEnabled;
    }

    public void setCertificateEnabled(
            boolean certificateEnabled
    ) {
        this.certificateEnabled =
                certificateEnabled;
    }

    public boolean isPortfolioEnabled() {
        return portfolioEnabled;
    }

    public void setPortfolioEnabled(
            boolean portfolioEnabled
    ) {
        this.portfolioEnabled =
                portfolioEnabled;
    }

    public boolean isMentorEnabled() {
        return mentorEnabled;
    }

    public void setMentorEnabled(
            boolean mentorEnabled
    ) {
        this.mentorEnabled =
                mentorEnabled;
    }

    public boolean isAiMentorEnabled() {
        return aiMentorEnabled;
    }

    public void setAiMentorEnabled(
            boolean aiMentorEnabled
    ) {
        this.aiMentorEnabled =
                aiMentorEnabled;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(
            boolean featured
    ) {
        this.featured =
                featured;
    }

    public MvpStatus getStatus() {
        return status;
    }

    public void setStatus(
            MvpStatus status
    ) {
        this.status = status;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(
            String ownerName
    ) {
        this.ownerName = ownerName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            LocalDateTime createdAt
    ) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(
            LocalDateTime updatedAt
    ) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(
            LocalDateTime publishedAt
    ) {
        this.publishedAt = publishedAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(
            LocalDateTime completedAt
    ) {
        this.completedAt = completedAt;
    }
}