package com.braintrain.mvp.controller;

import com.braintrain.mvp.entity.Community;
import com.braintrain.mvp.entity.CommunityMember;
import com.braintrain.mvp.dto.response.CommunityCommentResponse;
import com.braintrain.mvp.dto.response.CommunityMemberResponse;
import com.braintrain.mvp.dto.response.CommunityPostResponse;
import com.braintrain.mvp.dto.response.CommunityReactionResponse;
import com.braintrain.mvp.repository.CommunityRepository;
import com.braintrain.mvp.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;
    private final CommunityRepository communityRepository;

    @GetMapping
    public List<Community> getCommunities() {
        return communityRepository.findByActiveTrue();
    }

   @GetMapping("/feed")
public List<CommunityPostResponse> getFeed(
        @RequestParam Long communityId
) {
    return communityService.getFeed(communityId);
}

    @PostMapping("/join")
    public CommunityMember joinCommunity(
            @RequestParam Long communityId,
            Authentication authentication
    ) {
        return communityService.joinCommunity(
                communityId,
                authentication.getName()
        );
    }

    @PostMapping("/post")
    public CommunityPostResponse createPost(
            @RequestParam Long communityId,
            @RequestParam String content,
            Authentication authentication
    ) {
        return communityService.createPost(
                communityId,
                authentication.getName(),
                content
        );
    }

   @PostMapping("/comment")
public CommunityCommentResponse comment(
        @RequestParam Long postId,
        @RequestParam String message,
        Authentication authentication
) {

    return communityService.comment(
            postId,
            authentication.getName(),
            message
    );
}

  @PostMapping("/reaction")
public CommunityReactionResponse react(
        @RequestParam Long postId,
        @RequestParam String reaction,
        Authentication authentication
) {

    return communityService.reactToPost(
            postId,
            authentication.getName(),
            reaction
    );
}

    @GetMapping("/members")
public List<CommunityMemberResponse> getMembers(
        @RequestParam Long communityId
) {
    return communityService.getMembers(communityId);
}

   @GetMapping("/search")
public List<CommunityMemberResponse> searchMembers(
        @RequestParam Long communityId,
        @RequestParam String keyword
) {
    return communityService.searchMembers(
            communityId,
            keyword
    );
}

@GetMapping("/comments")
public List<CommunityCommentResponse> getComments(
        @RequestParam Long postId
) {

    return communityService.getComments(
            postId
    );
}

}
