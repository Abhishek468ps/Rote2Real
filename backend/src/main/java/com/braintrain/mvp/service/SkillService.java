package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.request.SkillRequest;
import com.braintrain.mvp.dto.response.SkillResponse;

import java.util.List;

public interface SkillService {

    List<SkillResponse> getAll();

    List<SkillResponse> getActive();
    SkillResponse getById(Long id);

    SkillResponse create(SkillRequest request);

    SkillResponse update(Long id, SkillRequest request);

    void delete(Long id);
}
