package com.braintrain.mvp.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public class MvpPlanResponse {

    private Long id;

    private Long mvpId;

    private String mvpCode;

    private String code;

    private String name;

    private String description;

    private Integer durationHours;

    private BigDecimal price;

    private String currency;

    private boolean free;

    private Integer maxTeamSize;

    private boolean certificateEnabled;

    private boolean portfolioEnabled;

    private boolean mentorEnabled;

    private boolean aiMentorEnabled;

    private boolean active;

    private Integer displayOrder;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
