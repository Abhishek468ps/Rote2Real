package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.LawyerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LawyerProfileRepository
        extends JpaRepository<LawyerProfile, Long> {
}
