package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.Community;
import com.braintrain.mvp.entity.CommunityPost;
import com.braintrain.mvp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {

    List<CommunityPost> findByCommunityOrderByCreatedAtDesc(
            Community community
    );

    List<CommunityPost> findByAuthorOrderByCreatedAtDesc(
            User author
    );

    long countByCommunity(
            Community community
    );

}