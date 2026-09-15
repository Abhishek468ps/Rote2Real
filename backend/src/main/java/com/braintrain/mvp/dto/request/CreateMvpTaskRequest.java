package com.braintrain.mvp.dto.request;

public class CreateMvpTaskRequest {

    private String title;

    private String description;

    private String taskType;

    private String priority;

    private String difficulty;

    private Integer estimatedMinutes;

    private Integer sequenceNumber;

    private Boolean mandatory;

    private Boolean submissionRequired;

    private Boolean githubRequired;

    private Integer deadlineOffsetHours;

    private Integer xpReward;


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

    public String getTaskType() {
        return taskType;
    }

    public void setTaskType(String taskType) {
        this.taskType = taskType;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
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

    public Boolean getMandatory() {
        return mandatory;
    }

    public void setMandatory(Boolean mandatory) {
        this.mandatory = mandatory;
    }

    public Boolean getSubmissionRequired() {
        return submissionRequired;
    }

    public void setSubmissionRequired(
            Boolean submissionRequired
    ) {
        this.submissionRequired =
                submissionRequired;
    }

    public Boolean getGithubRequired() {
        return githubRequired;
    }

    public void setGithubRequired(
            Boolean githubRequired
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
}