package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.response.MvpSkillResponse;
import com.braintrain.mvp.dto.response.MvpTechnologyResponse;

import java.util.List;

public interface MvpMappingService {

    List<MvpSkillResponse> getSkills(Long mvpId);

    MvpSkillResponse addSkill(
            Long mvpId,
            Long skillId
    );

    void removeSkill(
            Long mvpId,
            Long skillId
    );

    List<MvpTechnologyResponse> getTechnologies(
            Long mvpId
    );

    MvpTechnologyResponse addTechnology(
            Long mvpId,
            Long technologyId
    );

    void removeTechnology(
            Long mvpId,
            Long technologyId
    );
}
