package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.Community;
import com.braintrain.mvp.entity.CommunityMember;
import com.braintrain.mvp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommunityMemberRepository extends JpaRepository<CommunityMember, Long> {

    boolean existsByCommunityAndUser(
            Community community,
            User user
    );

    Optional<CommunityMember> findByCommunityAndUser(
            Community community,
            User user
    );

    List<CommunityMember> findByCommunity(
            Community community
    );

     @Query("""
        SELECT cm
        FROM CommunityMember cm
        JOIN FETCH cm.user
        WHERE cm.community = :community
    """)
    List<CommunityMember> findMembersWithUser(
            @Param("community") Community community
    );

    List<CommunityMember> findByUser(
            User user
    );

    long countByCommunity(
            Community community
    );

    List<CommunityMember> findByCommunityAndAdminTrue(
            Community community
    );

    void deleteByCommunityAndUser(
            Community community,
            User user
    );

}