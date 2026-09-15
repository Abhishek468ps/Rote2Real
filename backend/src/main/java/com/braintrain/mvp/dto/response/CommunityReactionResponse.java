package com.braintrain.mvp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommunityReactionResponse {

    private Long id;

    private Long postId;

    private Long userId;

    private String reaction;

    private boolean active;
}
