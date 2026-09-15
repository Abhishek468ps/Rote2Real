package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.TrainerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainerProfileRepository
        extends JpaRepository<TrainerProfile, Long> {
}