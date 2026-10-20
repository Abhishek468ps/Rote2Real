package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.response.UserProfileResponse;
import com.braintrain.mvp.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mentor")
@RequiredArgsConstructor
public class MentorController {

    private final AuthService authService;

    // ==========================================
    // CURRENT MENTOR
    // ==========================================

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> me(
            Authentication authentication
    ) {

        UserProfileResponse response =
                authService.getCurrentUser(authentication);

        return ResponseEntity.ok(response);
    }
}
