package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.request.CreateMvpPlanRequest;
import com.braintrain.mvp.dto.request.UpdateMvpPlanRequest;
import com.braintrain.mvp.dto.response.MvpPlanResponse;

import java.util.List;

public interface MvpPlanService {

    MvpPlanResponse createPlan(
            Long mvpId,
            CreateMvpPlanRequest request
    );

    List<MvpPlanResponse> getPlans(
            Long mvpId
    );

    List<MvpPlanResponse> getActivePlans(
            Long mvpId
    );

    MvpPlanResponse getPlan(
            Long mvpId,
            Long planId
    );

    MvpPlanResponse updatePlan(
            Long mvpId,
            Long planId,
            UpdateMvpPlanRequest request
    );

    void deletePlan(
            Long mvpId,
            Long planId
    );
}
