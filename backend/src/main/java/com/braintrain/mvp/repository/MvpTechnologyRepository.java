package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.MvpTechnology;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MvpTechnologyRepository
        extends JpaRepository<MvpTechnology, Long> {

    List<MvpTechnology> findByMvpId(Long mvpId);

    
    Optional<MvpTechnology> findByMvpIdAndTechnologyId(
            Long mvpId,
            Long technologyId
    );

    void deleteByMvpId(Long mvpId);

    boolean existsByMvpIdAndTechnologyId(
            Long mvpId,
            Long technologyId
    );

    void deleteByMvpIdAndTechnologyId(
            Long mvpId,
            Long technologyId
    );
}