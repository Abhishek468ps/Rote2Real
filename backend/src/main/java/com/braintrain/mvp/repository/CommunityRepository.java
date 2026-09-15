package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommunityRepository extends JpaRepository<Community, Long> {

    Optional<Community> findByName(String name);

    boolean existsByName(String name);

    List<Community> findByActiveTrue();

}
