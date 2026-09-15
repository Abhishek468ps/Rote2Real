package com.braintrain.mvp.dto.request;

import lombok.Data;

@Data
public class LoginRequest {

    private String brainTrainId;

    private String email;
}
