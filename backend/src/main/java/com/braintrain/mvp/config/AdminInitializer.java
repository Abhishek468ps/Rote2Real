package com.braintrain.mvp.config;

import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.enums.UserRole;
import com.braintrain.mvp.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private static final Logger log =
            LoggerFactory.getLogger(AdminInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Bootstrap password for the very first admin account.
     * Supplied via the ADMIN_BOOTSTRAP_PASSWORD environment variable so no
     * credential ever lives in source code. Empty means "do not bootstrap".
     */
    @Value("${admin.bootstrap.password:}")
    private String bootstrapPassword;

    @Override
    public void run(String... args) {

        String adminEmail = "admin@braintrainllp.in";
        String adminBraintrainId = "BT-ADM-2026-0001";

        // Check by BrainTrain ID first
        var adminByBraintrainId =
                userRepository.findByBraintrainId(adminBraintrainId);

        if (adminByBraintrainId.isPresent()) {

            log.info(
                    "Admin already exists with BrainTrain ID: {}",
                    adminBraintrainId
            );

            return;
        }

        // Check by email
        var adminByEmail =
                userRepository.findByEmail(adminEmail);

        if (adminByEmail.isPresent()) {

            log.info(
                    "Admin already exists with email: {}",
                    adminEmail
            );

            return;
        }

        if (bootstrapPassword == null || bootstrapPassword.isBlank()) {

            log.warn(
                    "No admin account exists and admin.bootstrap.password "
                            + "(ADMIN_BOOTSTRAP_PASSWORD) is not set - "
                            + "skipping admin bootstrap."
            );

            return;
        }

        // Create admin
        User admin = new User();

        admin.setFullName("Super Admin");

        admin.setEmail(adminEmail);

        admin.setPassword(
                passwordEncoder.encode(bootstrapPassword)
        );

        admin.setRole(UserRole.ADMIN);

        admin.setBraintrainId(adminBraintrainId);

        admin.setEmailVerified(true);

        admin.setActive(true);

        admin.setWallet(0);

        admin.setXp(0);

        admin.setProfileImage(null);

        userRepository.save(admin);

        log.info("Admin bootstrap account created successfully.");
    }
}
