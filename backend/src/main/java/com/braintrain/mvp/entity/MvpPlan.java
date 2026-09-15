/* 
package com.braintrain.mvp.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "mvp_plans",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_mvp_plan_code",
            columnNames = {
                "mvp_id",
                "code"
            }
        )
    }
)
public class MvpPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ============================================================
    // MVP
    // ============================================================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "mvp_id",
        nullable = false,
        foreignKey = @ForeignKey(
            name = "fk_mvp_plan_mvp"
        )
    )
    private Mvp mvp;


    // ============================================================
    // BASIC INFORMATION
    // ============================================================

    @Column(nullable = false, length = 100)
    private String code;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;


    // ============================================================
    // DURATION
    // ============================================================

    @Column(name = "duration_hours", nullable = false)
    private Integer durationHours;


    // ============================================================
    // PRICING
    // ============================================================

    @Column(
        nullable = false,
        precision = 12,
        scale = 2
    )
    private BigDecimal price = BigDecimal.ZERO;

    @Column(nullable = false, length = 10)
    private String currency = "INR";

    @Column(name = "is_free", nullable = false)
    private boolean free = false;


    // ============================================================
    // TEAM
    // ============================================================

    @Column(name = "max_team_size")
    private Integer maxTeamSize;


    // ============================================================
    // FEATURES
    // ============================================================

    @Column(name = "certificate_enabled", nullable = false)
    private boolean certificateEnabled = true;

    @Column(name = "portfolio_enabled", nullable = false)
    private boolean portfolioEnabled = true;

    @Column(name = "mentor_enabled", nullable = false)
    private boolean mentorEnabled = false;

    @Column(name = "ai_mentor_enabled", nullable = false)
    private boolean aiMentorEnabled = false;


    // ============================================================
    // STATUS
    // ============================================================

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;


    // ============================================================
    // TIMESTAMPS
    // ============================================================

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;


    // ============================================================
    // LIFECYCLE
    // ============================================================

    @PrePersist
    protected void onCreate() {

        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();
    }


    // ============================================================
    // GETTERS & SETTERS
    // ============================================================

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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Integer getMaxTeamSize() {
        return maxTeamSize;
    }

    public void setMaxTeamSize(Integer maxTeamSize) {
        this.maxTeamSize = maxTeamSize;
    }

    public boolean isCertificateEnabled() {
        return certificateEnabled;
    }

    public void setCertificateEnabled(boolean certificateEnabled) {
        this.certificateEnabled = certificateEnabled;
    }

    public boolean isPortfolioEnabled() {
        return portfolioEnabled;
    }

    public void setPortfolioEnabled(boolean portfolioEnabled) {
        this.portfolioEnabled = portfolioEnabled;
    }

    public boolean isMentorEnabled() {
        return mentorEnabled;
    }

    public void setMentorEnabled(boolean mentorEnabled) {
        this.mentorEnabled = mentorEnabled;
    }

    public boolean isAiMentorEnabled() {
        return aiMentorEnabled;
    }

    public void setAiMentorEnabled(boolean aiMentorEnabled) {
        this.aiMentorEnabled = aiMentorEnabled;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}*/

package com.braintrain.mvp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(
        name = "mvp_plans",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_mvp_plan_code",
                        columnNames = {"mvp_id", "code"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MvpPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Parent MVP
     */
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "mvp_id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "fk_mvp_plan_mvp"
            )
    )
    private Mvp mvp;

    /*
     * Example:
     * MVP_48H
     * MVP_7D
     * MVP_14D
     * MVP_21D
     * MVP_30D
     * MVP_60D
     */
    @Column(nullable = false, length = 50)
    private String code;

    /*
     * Example:
     * 48 Hours
     * 7 Days
     * 14 Days
     */
    @Column(nullable = false, length = 100)
    private String name;

    /*
     * Actual duration in hours
     */
    @Column(name = "duration_hours", nullable = false)
    private Integer durationHours;

    /*
     * Price
     */
    @Column(
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal price;

    /*
     * INR / USD
     */
    @Column(nullable = false, length = 10)
    private String currency;

    /*
     * 48-hour plan can be free
     */
    @Column(name = "is_free", nullable = false)
    private boolean free;

    /*
     * Description shown to student
     */
    @Column(columnDefinition = "TEXT")
    private String description;

    /*
     * Maximum team members allowed
     */
    @Column(name = "max_team_size")
    private Integer maxTeamSize;

    /*
     * Certificate available for this plan
     */
    @Column(name = "certificate_enabled", nullable = false)
    private boolean certificateEnabled;

    /*
     * Portfolio entry available
     */
    @Column(name = "portfolio_enabled", nullable = false)
    private boolean portfolioEnabled;

    /*
     * Human mentor available
     */
    @Column(name = "mentor_enabled", nullable = false)
    private boolean mentorEnabled;

    /*
     * AI mentor available
     */
    @Column(name = "ai_mentor_enabled", nullable = false)
    private boolean aiMentorEnabled;

    /*
     * Plan active/inactive
     */
    @Column(nullable = false)
    private boolean active;

    @Column(name = "display_order")
private Integer displayOrder;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {

        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;

        if (currency == null || currency.isBlank()) {
            currency = "INR";
        }

        if (maxTeamSize == null) {
            maxTeamSize = 1;
        }

        if (displayOrder == null) {
    displayOrder = 0;
}
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}