package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.request.TechnologyRequest;
import com.braintrain.mvp.dto.response.SkillResponse;
import com.braintrain.mvp.dto.response.TechnologyResponse;

import java.util.List;

public interface TechnologyService {

    List<TechnologyResponse> getAll();
      List<TechnologyResponse> getActive();

    TechnologyResponse getById(Long id);

    TechnologyResponse create(TechnologyRequest request);

    TechnologyResponse update(
            Long id,
            TechnologyRequest request
    );

    void delete(Long id);
}
