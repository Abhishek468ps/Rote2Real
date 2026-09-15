package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.RecruiterProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecruiterProfileRepository
        extends JpaRepository<RecruiterProfile, Long> {
}