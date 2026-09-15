package com.braintrain.mvp.entity;

import com.braintrain.mvp.enums.MvpTaskPriority;
import com.braintrain.mvp.enums.MvpTaskStatus;
import com.braintrain.mvp.enums.MvpTaskType;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(
        name = "mvp_tasks",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_mvp_task_sequence",
                        columnNames = {
                                "module_id",
                                "sequence_number"
                        }
                )
        }
)
public class MvpTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

@JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "module_id",
            nullable = false
    )
    private MvpModule module;


    @Column(nullable = false)
    private String title;


    @Column(columnDefinition = "TEXT")
    private String description;


    @Enumerated(EnumType.STRING)
    @Column(
            name = "task_type",
            nullable = false
    )
    private MvpTaskType taskType;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MvpTaskPriority priority =
            MvpTaskPriority.MEDIUM;


    @Column(length = 50)
    private String difficulty;


    @Column(name = "estimated_minutes")
    private Integer estimatedMinutes;


    @Column(
            name = "sequence_number",
            nullable = false
    )
    private Integer sequenceNumber;


    @Column(
            name = "is_mandatory",
            nullable = false
    )
    private boolean mandatory = true;


    @Column(
            name = "submission_required",
            nullable = false
    )
    private boolean submissionRequired = false;


    @Column(
            name = "github_required",
            nullable = false
    )
    private boolean githubRequired = false;


    @Column(name = "deadline_offset_hours")
    private Integer deadlineOffsetHours;


    @Column(
            name = "xp_reward",
            nullable = false
    )
    private Integer xpReward = 0;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MvpTaskStatus status =
            MvpTaskStatus.ACTIVE;


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

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (priority == null) {
            priority = MvpTaskPriority.MEDIUM;
        }

        if (status == null) {
            status = MvpTaskStatus.ACTIVE;
        }

        if (xpReward == null) {
            xpReward = 0;
        }
    }


    @PreUpdate
    public void preUpdate() {

        updatedAt = LocalDateTime.now();
    }


    // =========================
    // GETTERS & SETTERS
    // =========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MvpModule getModule() {
        return module;
    }

    public void setModule(MvpModule module) {
        this.module = module;
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

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}