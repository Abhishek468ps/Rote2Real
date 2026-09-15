package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.InstitutionProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstitutionProfileRepository
        extends JpaRepository<InstitutionProfile, Long> {
}