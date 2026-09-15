package com.braintrain.mvp.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MvpSkillResponse {

    private Long id;

    private Long mvpId;

    private Long skillId;

    private String skillCode;

    private String skillName;

    private String category;
}
