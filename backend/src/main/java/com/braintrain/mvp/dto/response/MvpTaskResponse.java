package com.braintrain.mvp.dto.response;

import com.braintrain.mvp.enums.MvpTaskPriority;
import com.braintrain.mvp.enums.MvpTaskStatus;
import com.braintrain.mvp.enums.MvpTaskType;

import java.time.LocalDateTime;

public class MvpTaskResponse {

    private Long id;

    private Long moduleId;

    private String moduleTitle;

    private Long mvpId;

    private String title;

    private String description;

    private MvpTaskType taskType;

    private MvpTaskPriority priority;

    private String difficulty;

    private Integer estimatedMinutes;

    private Integer sequenceNumber;

    private boolean mandatory;

    private boolean submissionRequired;

    private boolean githubRequired;

    private Integer deadlineOffsetHours;

    private Integer xpReward;

    private MvpTaskStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getModuleId() {
        return moduleId;
    }

    public void setModuleId(Long moduleId) {
        this.moduleId = moduleId;
    }

    public String getModuleTitle() {
        return moduleTitle;
    }

    public void setModuleTitle(String moduleTitle) {
        this.moduleTitle = moduleTitle;
    }

    public Long getMvpId() {
        return mvpId;
    }

    public void setMvpId(Long mvpId) {
        this.mvpId = mvpId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MvpTaskType getTaskType() {
        return taskType;
    }

    public void setTaskType(MvpTaskType taskType) {
        this.taskType = taskType;
    }

    public MvpTaskPriority getPriority() {
        return priority;
    }

    public void setPriority(MvpTaskPriority priority) {
        this.priority = priority;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public Integer getEstimatedMinutes() {
        return estimatedMinutes;
    }

    public void setEstimatedMinutes(Integer estimatedMinutes) {
        this.estimatedMinutes = estimatedMinutes;
    }

    public Integer getSequenceNumber() {
        return sequenceNumber;
    }

    public void setSequenceNumber(Integer sequenceNumber) {
        this.sequenceNumber = sequenceNumber;
    }

    public boolean isMandatory() {
        return mandatory;
    }

    public void setMandatory(boolean mandatory) {
        this.mandatory = mandatory;
    }

    public boolean isSubmissionRequired() {
        return submissionRequired;
    }

    public void setSubmissionRequired(
            boolean submissionRequired
    ) {
        this.submissionRequired =
                submissionRequired;
    }

    public boolean isGithubRequired() {
        return githubRequired;
    }

    public void setGithubRequired(
            boolean githubRequired
    ) {
        this.githubRequired =
                githubRequired;
    }

    public Integer getDeadlineOffsetHours() {
        return deadlineOffsetHours;
    }

    public void setDeadlineOffsetHours(
            Integer deadlineOffsetHours
    ) {
        this.deadlineOffsetHours =
                deadlineOffsetHours;
    }

    public Integer getXpReward() {
        return xpReward;
    }

    public void setXpReward(Integer xpReward) {
        this.xpReward = xpReward;
    }

    public MvpTaskStatus getStatus() {
        return status;
    }

    public void setStatus(MvpTaskStatus status) {
        this.status = status;
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