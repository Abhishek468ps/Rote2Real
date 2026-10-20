package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.Rote2RealExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Rote2RealExerciseRepository extends JpaRepository<Rote2RealExercise, Long> {

    List<Rote2RealExercise> findAllByOrderByDayNumberAsc();

    Optional<Rote2RealExercise> findByDayNumber(Integer dayNumber);
}
