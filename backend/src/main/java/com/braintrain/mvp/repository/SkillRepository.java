package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    Optional<Skill> findByCode(String code);

    
    Optional<Skill> findByName(String name);

    boolean existsByCode(String code);

    boolean existsByName(String name);

    List<Skill> findByActiveTrueOrderByDisplayOrderAsc();
      List<Skill> findByCategoryAndActiveTrueOrderByDisplayOrderAsc(
            String category
    );
}
