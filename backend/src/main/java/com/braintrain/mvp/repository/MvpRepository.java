package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.Mvp;
import com.braintrain.mvp.enums.MvpStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MvpRepository
        extends JpaRepository<Mvp, Long> {

    Optional<Mvp> findByMvpCode(
            String mvpCode
    );

    Optional<Mvp> findBySlug(
            String slug
    );

    boolean existsByMvpCode(
            String mvpCode
    );

    boolean existsBySlug(
            String slug
    );

    List<Mvp> findByStatusOrderByCreatedAtDesc(
            MvpStatus status
    );
Optional<Mvp> findByIdAndStatus(
        Long id,
        MvpStatus status
);
    List<Mvp> findByDomainIdOrderByCreatedAtDesc(
            Long domainId
    );

    List<Mvp> findByFeaturedTrueAndStatusOrderByCreatedAtDesc(
            MvpStatus status
    );

 

    long countByStatus(MvpStatus status);
    long countByDomainId(Long domainId);

    @Query("""
    SELECT m
    FROM Mvp m
    LEFT JOIN FETCH m.domain
    LEFT JOIN FETCH m.owner
    WHERE m.id = :id
""")
Optional<Mvp> findByIdWithDomainAndOwner(
        @Param("id") Long id
);

@Query("""
    SELECT DISTINCT m
    FROM Mvp m
    LEFT JOIN FETCH m.domain
    WHERE m.id = :id
""")
Optional<Mvp> findByIdWithDomain(@Param("id") Long id);

      // ==========================================
    // ADMIN MVP LIST WITH DOMAIN
    // ==========================================

    @Query("""
        SELECT m
        FROM Mvp m
        LEFT JOIN FETCH m.domain
        ORDER BY m.createdAt DESC
    """)
    List<Mvp> findAllWithDomain();

@Query("""
    SELECT m
    FROM Mvp m
    LEFT JOIN FETCH m.domain
    WHERE m.status = :status
    ORDER BY m.createdAt DESC
""")
List<Mvp> findByStatusWithDomain(@Param("status") MvpStatus status);

@Query("""
    SELECT m
    FROM Mvp m
    LEFT JOIN FETCH m.domain
    WHERE m.domain.id = :domainId
      AND m.status = :status
    ORDER BY m.createdAt DESC
""")
List<Mvp> findByDomainIdAndStatusWithDomain(
        @Param("domainId") Long domainId,
        @Param("status") MvpStatus status
);


}
