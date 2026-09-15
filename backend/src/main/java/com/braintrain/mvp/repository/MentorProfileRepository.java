package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.MentorProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MentorProfileRepository
        extends JpaRepository<MentorProfile, Long> {
}