package com.braintrain.mvp.entity;

import com.braintrain.mvp.enums.MvpDifficulty;
import com.braintrain.mvp.enums.MvpStatus;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
    name = "mvps",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = "mvp_code"
        ),
        @UniqueConstraint(
            columnNames = "slug"
        )
    }
)
public class Mvp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ==========================================
    // BASIC INFORMATION
    // ==========================================

    @Column(
        name = "mvp_code",
        nullable = false,
        unique = true,
        length = 50
    )
    private String mvpCode;


    @Column(
        nullable = false,
        length = 200
    )
    private String title;


    @Column(
        nullable = false,
        unique = true,
        length = 250
    )
    private String slug;


    @Column(
        name = "short_description",
        length = 500
    )
    private String shortDescription;


    @Column(
        columnDefinition = "TEXT"
    )
    private String description;


    // ==========================================
    // DOMAIN
    // ==========================================

  @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
        name = "domain_id",
        nullable = false,
        foreignKey = @ForeignKey(
            name = "fk_mvp_domain"
        )
    )
    private MvpDomain domain;

    // ==========================================
// PLANS
// ==========================================

@OneToMany(
        mappedBy = "mvp",
        cascade = CascadeType.ALL,
        orphanRemoval = true
)
private List<MvpPlan> plans = new ArrayList<>();

// ==========================================
// MODULES
// ==========================================

@OneToMany(
        mappedBy = "mvp",
        cascade = CascadeType.ALL,
        orphanRemoval = true
)
@OrderBy("moduleNumber ASC")
private List<MvpModule> modules = new ArrayList<>();

    // ==========================================
    // CATEGORY
    // ==========================================

    @Column(
        length = 150
    )
    private String category;


    // ==========================================
    // DIFFICULTY
    // ==========================================

    @Enumerated(EnumType.STRING)
    @Column(
        nullable = false,
        length = 30
    )
    private MvpDifficulty difficulty =
            MvpDifficulty.BEGINNER;


    // ==========================================
    // LEARNING INFORMATION
    // ==========================================

    @Column(
        columnDefinition = "TEXT"
    )
    private String prerequisites;


    @Column(
        name = "learning_outcomes",
        columnDefinition = "TEXT"
    )
    private String learningOutcomes;


    @Column(
        columnDefinition = "TEXT"
    )
    private String deliverables;


    // ==========================================
    // DURATION
    // ==========================================

    @Column(
        name = "estimated_hours"
    )
    private Integer estimatedHours;


    // ==========================================
    // TEAM
    // ==========================================

    @Column(
        name = "min_team_size",
        nullable = false
    )
    private Integer minTeamSize = 1;


    @Column(
        name = "max_team_size",
        nullable = false
    )
    private Integer maxTeamSize = 1;


    @Column(
        name = "team_allowed",
        nullable = false
    )
    private boolean teamAllowed = false;


    // ==========================================
    // REWARDS
    // ==========================================

    @Column(
        name = "reward_xp",
        nullable = false
    )
    private Integer rewardXp = 0;


    // ==========================================
    // FEATURES
    // ==========================================

    @Column(
        name = "certificate_enabled",
        nullable = false
    )
    private boolean certificateEnabled = true;


    @Column(
        name = "portfolio_enabled",
        nullable = false
    )
    private boolean portfolioEnabled = true;


    @Column(
        name = "mentor_enabled",
        nullable = false
    )
    private boolean mentorEnabled = false;


    @Column(
        name = "ai_mentor_enabled",
        nullable = false
    )
    private boolean aiMentorEnabled = false;


    @Column(
        nullable = false
    )
    private boolean featured = false;


    // ==========================================
    // STATUS
    // ==========================================

    @Enumerated(EnumType.STRING)
    @Column(
        nullable = false,
        length = 30
    )
    private MvpStatus status =
            MvpStatus.DRAFT;


    // ==========================================
    // OWNER
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "owner_id",
        foreignKey = @ForeignKey(
            name = "fk_mvp_owner"
        )
    )
    private User owner;


    // ==========================================
    // TIMESTAMPS
    // ==========================================

    @Column(
        nullable = false,
        updatable = false
    )
    private LocalDateTime createdAt;


    @Column(
        nullable = false
    )
    private LocalDateTime updatedAt;


    @Column(
        name = "published_at"
    )
    private LocalDateTime publishedAt;


    @Column(
        name = "completed_at"
    )
    private LocalDateTime completedAt;


    // ==========================================
    // PRE PERSIST
    // ==========================================

    @PrePersist
    public void prePersist() {

        LocalDateTime now =
                LocalDateTime.now();

        createdAt = now;
        updatedAt = now;

        if (
            status == MvpStatus.PUBLISHED
            && publishedAt == null
        ) {
            publishedAt = now;
        }
    }


    // ==========================================
    // PRE UPDATE
    // ==========================================

    @PreUpdate
    public void preUpdate() {

        updatedAt =
                LocalDateTime.now();

        if (
            status == MvpStatus.PUBLISHED
            && publishedAt == null
        ) {
            publishedAt =
                    LocalDateTime.now();
        }

        if (
            status == MvpStatus.ARCHIVED
            && completedAt == null
        ) {
            completedAt =
                    LocalDateTime.now();
        }
    }


    // ==========================================
    // GETTERS AND SETTERS
    // ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMvpCode() {
        return mvpCode;
    }

    public void setMvpCode(String mvpCode) {
        this.mvpCode = mvpCode;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
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

    public MvpDomain getDomain() {
        return domain;
    }

    public void setDomain(
            MvpDomain domain
    ) {
        this.domain = domain;
    }

    public List<MvpPlan> getPlans() {
    return plans;
}

public void setPlans(List<MvpPlan> plans) {
    this.plans = plans;
}

public List<MvpModule> getModules() {
    return modules;
}

public void setModules(List<MvpModule> modules) {
    this.modules = modules;
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

    public User getOwner() {
        return owner;
    }

    public void setOwner(
            User owner
    ) {
        this.owner = owner;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public LocalDateTime getPublishedAt() {
        return publishedAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }
}
