package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.JudgeProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JudgeProfileRepository
        extends JpaRepository<JudgeProfile, Long> {
}