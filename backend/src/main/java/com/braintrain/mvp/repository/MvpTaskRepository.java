package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.MvpTask;
import com.braintrain.mvp.enums.MvpTaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MvpTaskRepository
        extends JpaRepository<MvpTask, Long> {

    List<MvpTask> findByModuleIdOrderBySequenceNumberAsc(
            Long moduleId
    );

    List<MvpTask> findByModuleIdAndStatusOrderBySequenceNumberAsc(
            Long moduleId,
            MvpTaskStatus status
    );

    boolean existsByModuleIdAndSequenceNumber(
            Long moduleId,
            Integer sequenceNumber
    );

    boolean existsByModuleIdAndSequenceNumberAndIdNot(
            Long moduleId,
            Integer sequenceNumber,
            Long id
    );
}