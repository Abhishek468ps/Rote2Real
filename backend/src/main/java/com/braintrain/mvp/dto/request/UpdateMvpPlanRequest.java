package com.braintrain.mvp.dto.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdateMvpPlanRequest {

    private String code;

    private String name;

    private Integer durationHours;

    private BigDecimal price;

    private String currency;

    private boolean free;

    private String description;

    private Integer maxTeamSize;

    private boolean certificateEnabled;

    private boolean portfolioEnabled;

    private boolean mentorEnabled;

    private boolean aiMentorEnabled;

    private boolean active;

    private Integer displayOrder;
}
