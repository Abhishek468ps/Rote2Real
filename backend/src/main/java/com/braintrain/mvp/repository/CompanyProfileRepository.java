package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.CompanyProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyProfileRepository
        extends JpaRepository<CompanyProfile, Long> {
}