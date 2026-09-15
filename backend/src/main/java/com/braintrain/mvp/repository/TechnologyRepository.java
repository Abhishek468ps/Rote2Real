package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.Technology;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TechnologyRepository
        extends JpaRepository<Technology, Long> {

    Optional<Technology> findByCode(String code);

    Optional<Technology> findByName(String name);

    boolean existsByCode(String code);

    boolean existsByName(String name);

    List<Technology> findByActiveTrueOrderByDisplayOrderAsc();
     List<Technology> findByCategoryAndActiveTrueOrderByDisplayOrderAsc(
            String category
    );
}