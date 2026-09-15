package com.braintrain.mvp.dto.response;



import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
public class CommunityPostResponse {

    private Long id;

    private String content;

    private Long authorId;

    private String authorName;

    private String authorImage;

    private String authorRole;

    private String authorBraintrainId;

    private LocalDateTime createdAt;

}
