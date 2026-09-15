package com.braintrain.mvp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegistrationResponse {

    private Long userId;

    private String brainTrainId;

    private String role;

    private String message;
}