package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.Rote2RealSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Rote2RealSubmissionRepository extends JpaRepository<Rote2RealSubmission, Long> {

    List<Rote2RealSubmission> findByStudentId(Long studentId);

    Optional<Rote2RealSubmission> findByStudentIdAndExerciseId(Long studentId, Long exerciseId);
}
