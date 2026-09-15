package com.braintrain.mvp.repository;

import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.enums.UserRole;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface UserRepository
        extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

     long countByRole(
            UserRole role
    );

    List<User> findByRole(UserRole role);

    Optional<User> findByBraintrainId(String braintrainId);
    Optional<User> findByBraintrainIdAndEmail(
        String braintrainId,
        String email
);
}
