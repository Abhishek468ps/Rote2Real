package com.braintrain.mvp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class CommunityMemberResponse {

    private Long id;

    private Long userId;

    private String fullName;

    private String email;

    private String braintrainId;

    private String profileImage;

    private boolean admin;
    private boolean online;

    private LocalDateTime joinedAt;
}
