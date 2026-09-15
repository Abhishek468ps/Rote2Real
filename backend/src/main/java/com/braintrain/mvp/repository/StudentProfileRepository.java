package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentProfileRepository
        extends JpaRepository<StudentProfile, Long> {
}