package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.MvpModule;
import com.braintrain.mvp.enums.MvpModuleStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MvpModuleRepository
        extends JpaRepository<MvpModule, Long> {

    List<MvpModule> findByMvpIdOrderByModuleNumberAsc(Long mvpId);

    List<MvpModule> findByMvpIdAndStatusOrderByModuleNumberAsc(
            Long mvpId,
            MvpModuleStatus status
    );

    boolean existsByMvpIdAndModuleNumber(
            Long mvpId,
            Integer moduleNumber
    );

    boolean existsByMvpIdAndModuleNumberAndIdNot(
            Long mvpId,
            Integer moduleNumber,
            Long id
    );
}
