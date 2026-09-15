package com.braintrain.mvp.dto.request;

import java.math.BigDecimal;

public class CreateMvpPlanRequest {

    private String code;

    private String name;

    private String description;

    private Integer durationHours;

    private BigDecimal price;

    private String currency;

    private Boolean free;

    private Integer maxTeamSize;

    private Boolean certificateEnabled;

    private Boolean portfolioEnabled;

    private Boolean mentorEnabled;

    private Boolean aiMentorEnabled;

    private Boolean active;

    private Integer displayOrder;


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

    public Boolean getFree() {
        return free;
    }

    public void setFree(Boolean free) {
        this.free = free;
    }

    public Integer getMaxTeamSize() {
        return maxTeamSize;
    }

    public void setMaxTeamSize(Integer maxTeamSize) {
        this.maxTeamSize = maxTeamSize;
    }

    public Boolean getCertificateEnabled() {
        return certificateEnabled;
    }

    public void setCertificateEnabled(Boolean certificateEnabled) {
        this.certificateEnabled = certificateEnabled;
    }

    public Boolean getPortfolioEnabled() {
        return portfolioEnabled;
    }

    public void setPortfolioEnabled(Boolean portfolioEnabled) {
        this.portfolioEnabled = portfolioEnabled;
    }

    public Boolean getMentorEnabled() {
        return mentorEnabled;
    }

    public void setMentorEnabled(Boolean mentorEnabled) {
        this.mentorEnabled = mentorEnabled;
    }

    public Boolean getAiMentorEnabled() {
        return aiMentorEnabled;
    }

    public void setAiMentorEnabled(Boolean aiMentorEnabled) {
        this.aiMentorEnabled = aiMentorEnabled;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}