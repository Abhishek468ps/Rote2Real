package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.CommunityComment;
import com.braintrain.mvp.entity.CommunityPost;
import com.braintrain.mvp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityCommentRepository extends JpaRepository<CommunityComment, Long> {

    List<CommunityComment> findByPostOrderByCreatedAtAsc(
            CommunityPost post
    );

    List<CommunityComment> findByUserOrderByCreatedAtDesc(
            User user
    );

    long countByPost(
            CommunityPost post
    );

}
