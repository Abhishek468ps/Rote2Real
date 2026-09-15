package com.braintrain.mvp.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUserUpdateRequest {

    private String fullName;

    private String email;

    private String phone;

    private String braintrainId;

    private String role;

    private boolean emailVerified;

    private boolean active;
}