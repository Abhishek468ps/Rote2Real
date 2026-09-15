package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.CommunityPost;
import com.braintrain.mvp.entity.CommunityReaction;
import com.braintrain.mvp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommunityReactionRepository
        extends JpaRepository<CommunityReaction, Long> {

    Optional<CommunityReaction> findByPostAndUser(
            CommunityPost post,
            User user
    );

    List<CommunityReaction> findByPost(
            CommunityPost post
    );

    List<CommunityReaction> findByUser(
            User user
    );

    long countByPost(
            CommunityPost post
    );

    long countByPostAndReaction(
            CommunityPost post,
            String reaction
    );

    boolean existsByPostAndUser(
            CommunityPost post,
            User user
    );

    void deleteByPostAndUser(
            CommunityPost post,
            User user
    );

}
