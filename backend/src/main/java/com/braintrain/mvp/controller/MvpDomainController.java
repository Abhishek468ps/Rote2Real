package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.request.MvpDomainRequest;
import com.braintrain.mvp.dto.response.MvpDomainResponse;
import com.braintrain.mvp.service.MvpDomainService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/mvp-domains")
@RequiredArgsConstructor
public class MvpDomainController {


    private final MvpDomainService domainService;


    // ==========================================
    // GET ALL DOMAINS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<MvpDomainResponse>>
    getAllDomains() {

        return ResponseEntity.ok(
                domainService.getAllDomains()
        );
    }


    // ==========================================
    // GET ACTIVE DOMAINS
    // ==========================================

    @GetMapping("/active")
    public ResponseEntity<List<MvpDomainResponse>>
    getActiveDomains() {

        return ResponseEntity.ok(
                domainService.getActiveDomains()
        );
    }


    // ==========================================
    // GET DOMAIN BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<MvpDomainResponse>
    getDomainById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                domainService.getDomainById(id)
        );
    }


    // ==========================================
    // CREATE DOMAIN
    // ==========================================

    @PostMapping
    public ResponseEntity<MvpDomainResponse>
    createDomain(
            @RequestBody MvpDomainRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        domainService.createDomain(
                                request
                        )
                );
    }


    // ==========================================
    // UPDATE DOMAIN
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<MvpDomainResponse>
    updateDomain(
            @PathVariable Long id,
            @RequestBody MvpDomainRequest request
    ) {

        return ResponseEntity.ok(
                domainService.updateDomain(
                        id,
                        request
                )
        );
    }


    // ==========================================
    // DELETE DOMAIN
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDomain(
            @PathVariable Long id
    ) {

        domainService.deleteDomain(id);

        return ResponseEntity.ok(
                "MVP domain deleted successfully"
        );
    }
}
