package com.braintrain.mvp.entity;

import com.braintrain.mvp.enums.MvpModuleStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(
        name = "mvp_modules",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_mvp_module_number",
                        columnNames = {"mvp_id", "module_number"}
                )
        }
)
public class MvpModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "mvp_id",
            nullable = false
    )
    private Mvp mvp;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "module_number", nullable = false)
    private Integer moduleNumber;

    @Column(name = "estimated_hours")
    private Integer estimatedHours;

    @Column(length = 50)
    private String difficulty;

    @Column(
            name = "learning_objectives",
            columnDefinition = "TEXT"
    )
    private String learningObjectives;

    @Column(
            name = "deliverables",
            columnDefinition = "TEXT"
    )
    private String deliverables;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MvpModuleStatus status = MvpModuleStatus.ACTIVE;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;


    @PrePersist
    public void prePersist() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (status == null) {
            status = MvpModuleStatus.ACTIVE;
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

    public Mvp getMvp() {
        return mvp;
    }

    public void setMvp(Mvp mvp) {
        this.mvp = mvp;
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

    public Integer getModuleNumber() {
        return moduleNumber;
    }

    public void setModuleNumber(Integer moduleNumber) {
        this.moduleNumber = moduleNumber;
    }

    public Integer getEstimatedHours() {
        return estimatedHours;
    }

    public void setEstimatedHours(Integer estimatedHours) {
        this.estimatedHours = estimatedHours;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getLearningObjectives() {
        return learningObjectives;
    }

    public void setLearningObjectives(String learningObjectives) {
        this.learningObjectives = learningObjectives;
    }

    public String getDeliverables() {
        return deliverables;
    }

    public void setDeliverables(String deliverables) {
        this.deliverables = deliverables;
    }

    public MvpModuleStatus getStatus() {
        return status;
    }

    public void setStatus(MvpModuleStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
