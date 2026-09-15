package com.braintrain.mvp.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MvpTechnologyResponse {

    private Long id;

    private Long mvpId;

    private Long technologyId;

    private String technologyCode;

    private String technologyName;

    private String category;
}