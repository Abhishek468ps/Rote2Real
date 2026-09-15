package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.entity.Community;
import com.braintrain.mvp.entity.CommunityComment;
import com.braintrain.mvp.entity.CommunityMember;
import com.braintrain.mvp.entity.CommunityPost;
import com.braintrain.mvp.entity.CommunityReaction;
import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.repository.CommunityCommentRepository;
import com.braintrain.mvp.repository.CommunityMemberRepository;
import com.braintrain.mvp.repository.CommunityPostRepository;
import com.braintrain.mvp.repository.CommunityReactionRepository;
import com.braintrain.mvp.repository.CommunityRepository;
import com.braintrain.mvp.repository.UserRepository;
import com.braintrain.mvp.service.CommunityService;
import com.braintrain.mvp.dto.response.CommunityPostResponse;
import com.braintrain.mvp.dto.response.CommunityReactionResponse;
import com.braintrain.mvp.dto.response.CommunityCommentResponse;
import com.braintrain.mvp.dto.response.CommunityMemberResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CommunityServiceImpl implements CommunityService {

    private final CommunityRepository communityRepository;

    private final CommunityMemberRepository communityMemberRepository;

    private final CommunityPostRepository communityPostRepository;

    private final CommunityCommentRepository communityCommentRepository;

    private final CommunityReactionRepository communityReactionRepository;

    private final UserRepository userRepository;


    /* =====================================================
       JOIN COMMUNITY
    ===================================================== */

    @Override
    public CommunityMember joinCommunity(
            Long communityId,
            String email
    ) {

        Community community =
                findCommunity(communityId);

        User user =
                findUser(email);

        /*
         * Already a member?
         */
        if (
                communityMemberRepository
                        .existsByCommunityAndUser(
                                community,
                                user
                        )
        ) {

            return communityMemberRepository
                    .findByCommunityAndUser(
                            community,
                            user
                    )
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Community membership not found"
                            )
                    );
        }

        /*
         * Create membership
         */
        CommunityMember member =
                CommunityMember.builder()
                        .community(community)
                        .user(user)
                        .admin(false)
                        .build();

        return communityMemberRepository.save(member);
    }


    /* =====================================================
       LEAVE COMMUNITY
    ===================================================== */

    @Override
    public void leaveCommunity(
            Long communityId,
            String email
    ) {

        Community community =
                findCommunity(communityId);

        User user =
                findUser(email);

        communityMemberRepository
                .deleteByCommunityAndUser(
                        community,
                        user
                );
    }


    /* =====================================================
       CREATE POST
    ===================================================== */

    @Override
    public CommunityPostResponse createPost(
            Long communityId,
            String email,
            String content
    ) {

        Community community =
                findCommunity(communityId);

        User user =
                findUser(email);

        /*
         * User must be a member
         */
        boolean isMember =
                communityMemberRepository
                        .existsByCommunityAndUser(
                                community,
                                user
                        );

        if (!isMember) {

            throw new RuntimeException(
                    "You must join the community before creating a post"
            );
        }

        /*
         * Validate content
         */
        if (
                content == null ||
                content.trim().isEmpty()
        ) {

            throw new RuntimeException(
                    "Post content cannot be empty"
            );
        }

        CommunityPost post =
                CommunityPost.builder()
                        .community(community)
                        .author(user)
                        .content(content.trim())
                        .build();

       CommunityPost savedPost =
        communityPostRepository.save(post);


return new CommunityPostResponse(
        savedPost.getId(),
        savedPost.getContent(),
        savedPost.getAuthor().getId(),
        savedPost.getAuthor().getFullName(),
        savedPost.getAuthor().getProfileImage(),
        savedPost.getAuthor().getRole().name(),
        savedPost.getAuthor().getBraintrainId(),
        savedPost.getCreatedAt()
);
    }


    /* =====================================================
       COMMENT
    ===================================================== */

    @Override
    public CommunityCommentResponse  comment(
            Long postId,
            String email,
            String message
    ) {

        CommunityPost post =
                findPost(postId);

        User user =
                findUser(email);

        if (
                message == null ||
                message.trim().isEmpty()
        ) {

            throw new RuntimeException(
                    "Comment cannot be empty"
            );
        }

        CommunityComment comment =
        CommunityComment.builder()
                .post(post)
                .user(user)
                .message(message.trim())
                .build();

CommunityComment savedComment =
        communityCommentRepository.save(comment);

return new CommunityCommentResponse(
        savedComment.getId(),
        post.getId(),
        user.getId(),
        user.getFullName(),
        user.getProfileImage(),
        user.getRole().name(),
        user.getBraintrainId(),
        savedComment.getMessage(),
        savedComment.getCreatedAt()
);
    }


    /* =====================================================
       REACTION
    ===================================================== */

   @Override
public CommunityReactionResponse reactToPost(
        Long postId,
        String email,
        String reaction
) {

    CommunityPost post =
            findPost(postId);

    User user =
            findUser(email);

    if (
            reaction == null ||
            reaction.trim().isEmpty()
    ) {
        throw new RuntimeException(
                "Reaction cannot be empty"
        );
    }

    String normalizedReaction =
            reaction.trim().toUpperCase();

    CommunityReaction existingReaction =
            communityReactionRepository
                    .findByPostAndUser(
                            post,
                            user
                    )
                    .orElse(null);

    /*
     * SAME REACTION
     * => remove reaction
     */
    if (
            existingReaction != null &&
            existingReaction.getReaction()
                    .equals(normalizedReaction)
    ) {

        Long reactionId =
                existingReaction.getId();

        communityReactionRepository.delete(
                existingReaction
        );

        return new CommunityReactionResponse(
                reactionId,
                post.getId(),
                user.getId(),
                normalizedReaction,
                false
        );
    }

    /*
     * DIFFERENT REACTION
     * => update existing reaction
     */
    if (existingReaction != null) {

        existingReaction.setReaction(
                normalizedReaction
        );

        CommunityReaction saved =
                communityReactionRepository.save(
                        existingReaction
                );

        return new CommunityReactionResponse(
                saved.getId(),
                post.getId(),
                user.getId(),
                saved.getReaction(),
                true
        );
    }

    /*
     * NEW REACTION
     */
    CommunityReaction newReaction =
            CommunityReaction.builder()
                    .post(post)
                    .user(user)
                    .reaction(normalizedReaction)
                    .build();

    CommunityReaction saved =
            communityReactionRepository.save(
                    newReaction
            );

    return new CommunityReactionResponse(
            saved.getId(),
            post.getId(),
            user.getId(),
            saved.getReaction(),
            true
    );
}


    /* =====================================================
       GET FEED
    ===================================================== */

    @Override
    @Transactional(readOnly = true)
public List<CommunityPostResponse> getFeed(
            Long communityId
    ) {

        Community community =
                findCommunity(communityId);

          return communityPostRepository
            .findByCommunityOrderByCreatedAtDesc(community)
            .stream()
            .map(post -> new CommunityPostResponse(
                    post.getId(),
                    post.getContent(),
                    post.getAuthor().getId(),
                    post.getAuthor().getFullName(),
                    post.getAuthor().getProfileImage(),
                    post.getAuthor().getRole().name(),
                    post.getAuthor().getBraintrainId(),
                    post.getCreatedAt()
            ))
            .toList();
}


    /* =====================================================
       GET MEMBERS
    ===================================================== */

    @Override
@Transactional(readOnly = true)
public List<CommunityMemberResponse> getMembers(
        Long communityId
) {

    Community community =
            findCommunity(communityId);

    return communityMemberRepository
            .findMembersWithUser(community)
            .stream()
            .map(member -> new CommunityMemberResponse(
                    member.getId(),
                    member.getUser().getId(),
                    member.getUser().getFullName(),
                    member.getUser().getEmail(),
                    member.getUser().getBraintrainId(),
                    member.getUser().getProfileImage(),
                    member.isAdmin(),
                    member.getUser().getLastSeen() != null &&
                member.getUser().getLastSeen().isAfter(LocalDateTime.now().minusMinutes(5)),
                    member.getJoinedAt()
            ))
            .toList();
}


    /* =====================================================
       SEARCH MEMBERS
    ===================================================== */

    @Override
@Transactional(readOnly = true)
public List<CommunityMemberResponse> searchMembers(
        Long communityId,
        String keyword
) {

    Community community =
            findCommunity(communityId);

    String search =
            keyword == null
                    ? ""
                    : keyword.trim().toLowerCase();

    return communityMemberRepository
            .findMembersWithUser(community)
            .stream()
            .filter(member -> {

                if (member.getUser() == null) {
                    return false;
                }

                String name =
                        member.getUser().getFullName();

                String email =
                        member.getUser().getEmail();

                boolean nameMatches =
                        name != null &&
                        name.toLowerCase()
                                .contains(search);

                boolean emailMatches =
                        email != null &&
                        email.toLowerCase()
                                .contains(search);

                return nameMatches || emailMatches;
            })
            .map(member -> new CommunityMemberResponse(
                    member.getId(),
                    member.getUser().getId(),
                    member.getUser().getFullName(),
                    member.getUser().getEmail(),
                    member.getUser().getBraintrainId(),
                    member.getUser().getProfileImage(),
                    member.isAdmin(),
                    member.getUser().getLastSeen() != null &&
                member.getUser().getLastSeen().isAfter(LocalDateTime.now().minusMinutes(5)),
                    member.getJoinedAt()
            ))
            .toList();
}

@Override
@Transactional(readOnly = true)
public List<CommunityCommentResponse> getComments(
        Long postId
) {

    CommunityPost post =
            findPost(postId);

    return communityCommentRepository
            .findByPostOrderByCreatedAtAsc(post)
            .stream()
            .map(comment ->

                    new CommunityCommentResponse(

                            comment.getId(),

                            post.getId(),

                            comment.getUser().getId(),

                            comment.getUser().getFullName(),

                            comment.getUser().getProfileImage(),

                            comment.getUser().getRole().name(),

                            comment.getUser().getBraintrainId(),

                            comment.getMessage(),

                            comment.getCreatedAt()

                    )

            )
            .toList();
}

    /* =====================================================
       MEMBER COUNT
    ===================================================== */

    @Override
    @Transactional(readOnly = true)
    public long getMemberCount(
            Long communityId
    ) {

        Community community =
                findCommunity(communityId);

        return communityMemberRepository
                .countByCommunity(community);
    }


    /* =====================================================
       POST COUNT
    ===================================================== */

    @Override
    @Transactional(readOnly = true)
    public long getPostCount(
            Long communityId
    ) {

        Community community =
                findCommunity(communityId);

        return communityPostRepository
                .countByCommunity(community);
    }


    /* =====================================================
       FIND COMMUNITY
    ===================================================== */

    private Community findCommunity(
            Long communityId
    ) {

        return communityRepository
                .findById(communityId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Community not found"
                        )
                );
    }


    /* =====================================================
       FIND POST
    ===================================================== */

    private CommunityPost findPost(
            Long postId
    ) {

        return communityPostRepository
                .findById(postId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Post not found"
                        )
                );
    }


    /* =====================================================
       FIND USER
    ===================================================== */

    private User findUser(
            String email
    ) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );
    }
}