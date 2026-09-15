package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.MvpDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MvpDomainRepository
        extends JpaRepository<MvpDomain, Long> {

    Optional<MvpDomain> findByCode(
            String code
    );

    boolean existsByCode(
            String code
    );

    List<MvpDomain> findByActiveTrueOrderByDisplayOrderAsc();
}
