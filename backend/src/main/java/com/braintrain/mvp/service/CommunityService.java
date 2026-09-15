package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.response.CommunityPostResponse;
import com.braintrain.mvp.dto.response.CommunityReactionResponse;
import com.braintrain.mvp.entity.CommunityMember;
import com.braintrain.mvp.dto.response.CommunityCommentResponse;
import com.braintrain.mvp.dto.response.CommunityMemberResponse;


import java.util.List;

public interface CommunityService {

    CommunityMember joinCommunity(
            Long communityId,
            String email
    );

    void leaveCommunity(
            Long communityId,
            String email
    );

   CommunityPostResponse createPost(
        Long communityId,
        String email,
        String content
);

   CommunityCommentResponse comment(
        Long postId,
        String email,
        String message
);

   CommunityReactionResponse reactToPost(
        Long postId,
        String email,
        String reaction
);

    List<CommunityPostResponse> getFeed(Long communityId);

   

 List<CommunityMemberResponse> getMembers(
        Long communityId
);

List<CommunityMemberResponse> searchMembers(
        Long communityId,
        String keyword
);

 List<CommunityCommentResponse> getComments(
        Long postId
);

    long getMemberCount(
            Long communityId
    );

    long getPostCount(
            Long communityId
    );

}