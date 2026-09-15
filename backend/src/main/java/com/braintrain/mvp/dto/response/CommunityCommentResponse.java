package com.braintrain.mvp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class CommunityCommentResponse {

    private Long id;

    private Long postId;

    private Long userId;

    private String fullName;

    private String profileImage;

    private String role;

    private String braintrainId;

    private String message;

    private LocalDateTime createdAt;
}
