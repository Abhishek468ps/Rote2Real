package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.request.CreateMvpModuleRequest;
import com.braintrain.mvp.dto.request.UpdateMvpModuleRequest;
import com.braintrain.mvp.dto.response.MvpModuleResponse;

import java.util.List;

public interface MvpModuleService {

    MvpModuleResponse createModule(
            Long mvpId,
            CreateMvpModuleRequest request
    );

    List<MvpModuleResponse> getModulesByMvp(
            Long mvpId
    );

    MvpModuleResponse getModule(
            Long moduleId
    );

    MvpModuleResponse updateModule(
            Long moduleId,
            UpdateMvpModuleRequest request
    );

    void deleteModule(
            Long moduleId
    );
}