package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.ViewerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViewerProfileRepository
        extends JpaRepository<ViewerProfile, Long> {
}