package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.response.MvpDomainResponse;
import com.braintrain.mvp.service.MvpDomainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mvp-domains")
@RequiredArgsConstructor
public class MvpDomainPublicController {

    private final MvpDomainService domainService;

    @GetMapping("/active")
    public ResponseEntity<List<MvpDomainResponse>> getActiveDomains() {
        return ResponseEntity.ok(
                domainService.getActiveDomains()
        );
    }
}
