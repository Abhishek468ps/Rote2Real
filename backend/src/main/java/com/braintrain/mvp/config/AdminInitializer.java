/*package com.braintrain.mvp.config;

import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.enums.UserRole;
import com.braintrain.mvp.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        String adminEmail = "monikasingh@braintrainllp.in";

        if (userRepository.findByEmail(adminEmail).isPresent()) {

            System.out.println("Admin already exists.");

            return;
        }

        User admin = new User();

        admin.setFullName("Super Admin");

        admin.setEmail(adminEmail);

        admin.setPassword(
                passwordEncoder.encode("Admin@123")
        );

        admin.setRole(UserRole.ADMIN);

        admin.setBraintrainId("BT-ADM-2026-0001");

        admin.setEmailVerified(true);

        admin.setActive(true);

        admin.setWallet(0);

        admin.setXp(0);

        admin.setProfileImage(null);

        userRepository.save(admin);

        System.out.println("Admin user created successfully.");

    }

}*/


package com.braintrain.mvp.config;

import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.enums.UserRole;
import com.braintrain.mvp.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        String adminEmail = "admin@braintrainllp.in";
        String adminBraintrainId = "BT-ADM-2026-0001";

        // Check by BrainTrain ID first
        var adminByBraintrainId =
                userRepository.findByBraintrainId(adminBraintrainId);

        if (adminByBraintrainId.isPresent()) {

            System.out.println(
                    "Admin already exists with BrainTrain ID: "
                            + adminBraintrainId
            );

            return;
        }

        // Check by email
        var adminByEmail =
                userRepository.findByEmail(adminEmail);

        if (adminByEmail.isPresent()) {

            System.out.println(
                    "Admin already exists with email: "
                            + adminEmail
            );

            return;
        }

        // Create admin
        User admin = new User();

        admin.setFullName("Super Admin");

        admin.setEmail(adminEmail);

        admin.setPassword(
                passwordEncoder.encode("Admin@123")
        );

        admin.setRole(UserRole.ADMIN);

        admin.setBraintrainId(adminBraintrainId);

        admin.setEmailVerified(true);

        admin.setActive(true);

        admin.setWallet(0);

        admin.setXp(0);

        admin.setProfileImage(null);

        userRepository.save(admin);

        System.out.println(
                "Admin user created successfully."
        );
    }
}
