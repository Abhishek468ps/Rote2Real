package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.MvpPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MvpPlanRepository
        extends JpaRepository<MvpPlan, Long> {

    List<MvpPlan> findByMvpIdOrderByDisplayOrderAscDurationHoursAsc(
        Long mvpId
);

List<MvpPlan> findByMvpIdAndActiveTrueOrderByDisplayOrderAscDurationHoursAsc(
        Long mvpId
);


    Optional<MvpPlan> findByIdAndMvpId(
            Long id,
            Long mvpId
    );

    boolean existsByMvpIdAndCode(
            Long mvpId,
            String code
    );

    boolean existsByMvpIdAndCodeAndIdNot(
            Long mvpId,
            String code,
            Long id
    );
}
