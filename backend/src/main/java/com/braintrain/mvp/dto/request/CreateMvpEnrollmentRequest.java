package com.braintrain.mvp.dto.request;

public class CreateMvpEnrollmentRequest {

    private Long mvpId;

    private Long planId;

    public Long getMvpId() {
        return mvpId;
    }

    public void setMvpId(Long mvpId) {
        this.mvpId = mvpId;
    }

    public Long getPlanId() {
        return planId;
    }

    public void setPlanId(Long planId) {
        this.planId = planId;
    }
}