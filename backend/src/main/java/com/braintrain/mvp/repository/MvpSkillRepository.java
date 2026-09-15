package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.MvpSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MvpSkillRepository
        extends JpaRepository<MvpSkill, Long> {

    List<MvpSkill> findByMvpId(Long mvpId);
    Optional<MvpSkill> findByMvpIdAndSkillId(
            Long mvpId,
            Long skillId
    );

    void deleteByMvpId(Long mvpId);

    boolean existsByMvpIdAndSkillId(
            Long mvpId,
            Long skillId
    );

    void deleteByMvpIdAndSkillId(
            Long mvpId,
            Long technologyId
    );
}
