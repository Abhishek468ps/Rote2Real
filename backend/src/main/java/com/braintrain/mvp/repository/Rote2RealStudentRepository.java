package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.Rote2RealStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Rote2RealStudentRepository extends JpaRepository<Rote2RealStudent, Long> {

    Optional<Rote2RealStudent> findByEmail(String email);
}
