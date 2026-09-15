package com.braintrain.mvp.dto.response;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserResponse {

    private Long id;

    private String braintrainId;

    private String fullName;

    private String role;

    private String email;

    private String phone;

    private String skills;

    private Boolean emailVerified;

    private Boolean paymentCompleted;

    private Boolean active;

    private LocalDateTime createdAt;
}