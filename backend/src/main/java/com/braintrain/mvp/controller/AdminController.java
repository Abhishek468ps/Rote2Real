package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.response.UserProfileResponse;
import com.braintrain.mvp.dto.response.AdminUserResponse;
import com.braintrain.mvp.dto.request.*;
import com.braintrain.mvp.repository.UserRepository;
import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.enums.UserRole;
import com.braintrain.mvp.service.AuthService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AuthService authService;
     private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> me(
            Authentication authentication
    ) {

        UserProfileResponse response =
                authService.getCurrentUser(authentication);

        return ResponseEntity.ok(response);
    }

    // ==========================================
    // GET ALL USERS
    // ==========================================

    @GetMapping("/users")
    public ResponseEntity<List<AdminUserResponse>> getAllUsers() {

        List<AdminUserResponse> users =
                userRepository.findAll()
                        .stream()
                        .map(this::mapToResponse)
                        .toList();

        return ResponseEntity.ok(users);
    }


    // ==========================================
    // GET TOTAL USERS
    // ==========================================

    @GetMapping("/users/count")
    public ResponseEntity<Long> getUserCount() {

        return ResponseEntity.ok(
                userRepository.count()
        );
    }


    // ==========================================
    // GET USER BY ID
    // ==========================================

    
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(
            @PathVariable Long id
    ) {

        return userRepository.findById(id)
                .map(user -> ResponseEntity.ok(
                        mapToResponse(user)
                ))
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

                // ==========================================
// UPDATE USER
// ==========================================

@PutMapping("/users/{id}")
public ResponseEntity<?> updateUser(
        @PathVariable Long id,
        @RequestBody AdminUserUpdateRequest request
) {

    User user = userRepository.findById(id)
            .orElse(null);

    if (user == null) {
        return ResponseEntity.notFound().build();
    }

    user.setFullName(request.getFullName());
    user.setEmail(request.getEmail());
    user.setPhone(request.getPhone());
    user.setBraintrainId(request.getBraintrainId());
    user.setEmailVerified(request.isEmailVerified());
    user.setActive(request.isActive());

    if (request.getRole() != null) {
        user.setRole(
                UserRole.valueOf(
                        request.getRole().toUpperCase()
                )
        );
    }

    User updatedUser =
            userRepository.save(user);

    return ResponseEntity.ok(
            mapToResponse(updatedUser)
    );
}


    // ==========================================
    // DELETE USER
    // ==========================================

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id
    ) {

        if (!userRepository.existsById(id)) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        userRepository.deleteById(id);

        return ResponseEntity.ok(
                "User deleted successfully"
        );
    }


    // ==========================================
    // ENTITY → RESPONSE
    // ==========================================

    private AdminUserResponse mapToResponse(User user) {

        return AdminUserResponse.builder()

                .id(
                        user.getId()
                )

                .braintrainId(
                        user.getBraintrainId()
                )

                .fullName(
                        user.getFullName()
                )

                .email(
                        user.getEmail()
                )

                .phone(
                        user.getPhone()
                )

                .role(
                        user.getRole() != null
                                ? user.getRole().name()
                                : null
                )

                .emailVerified(
        user.isEmailVerified()
)

.active(
        user.isActive()
)

                .createdAt(
                        user.getCreatedAt()
                )

                // Temporary payment status
                .paymentCompleted(false)

                .build();
    }
}

