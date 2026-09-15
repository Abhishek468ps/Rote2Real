package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.response.MvpResponse;
import com.braintrain.mvp.dto.response.UserProfileResponse;
import com.braintrain.mvp.service.AuthService;
import com.braintrain.mvp.service.MvpService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {

    private final AuthService authService;

    private final MvpService mvpService;


    // ==========================================
    // STUDENT PROFILE
    // ==========================================

    @GetMapping("/profile")
    public String profile() {

        return "Student Profile";
    }


    // ==========================================
    // CURRENT STUDENT
    // ==========================================

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> me(
            Authentication authentication
    ) {

        UserProfileResponse response =
                authService.getCurrentUser(authentication);

        return ResponseEntity.ok(response);
    }


    // ==========================================
    // STUDENT MVPS BY DOMAIN
    // ==========================================

    @GetMapping("/domain/{domainId}")
    public ResponseEntity<List<MvpResponse>> getMvpsByDomain(
            @PathVariable Long domainId
    ) {

        return ResponseEntity.ok(
                mvpService.getStudentMvpsByDomain(domainId)
        );
    }
}