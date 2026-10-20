package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.Rote2RealClassification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Rote2RealClassificationRepository extends JpaRepository<Rote2RealClassification, Long> {

    Optional<Rote2RealClassification> findByStudentId(Long studentId);
}
