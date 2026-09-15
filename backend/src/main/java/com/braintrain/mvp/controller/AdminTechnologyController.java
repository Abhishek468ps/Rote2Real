package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.request.TechnologyRequest;
import com.braintrain.mvp.dto.response.TechnologyResponse;
import com.braintrain.mvp.service.TechnologyService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/technologies")
@RequiredArgsConstructor
public class AdminTechnologyController {

    private final TechnologyService technologyService;

    // ============================================================
    // GET ALL TECHNOLOGIES
    // ============================================================

    @GetMapping
    public ResponseEntity<List<TechnologyResponse>>
    getAllTechnologies() {

        return ResponseEntity.ok(
                technologyService.getAll()
        );
    }

     @GetMapping("/active")
    public ResponseEntity<List<TechnologyResponse>> getActive() {

        return ResponseEntity.ok(
                technologyService.getActive()
        );
    }

    // ============================================================
    // GET TECHNOLOGY BY ID
    // ============================================================

    @GetMapping("/{id}")
    public ResponseEntity<TechnologyResponse>
    getTechnologyById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                technologyService.getById(id)
        );
    }

    // ============================================================
    // CREATE TECHNOLOGY
    // ============================================================

    @PostMapping
    public ResponseEntity<TechnologyResponse>
    createTechnology(
            @RequestBody TechnologyRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        technologyService.create(request)
                );
    }

    // ============================================================
    // UPDATE TECHNOLOGY
    // ============================================================

    @PutMapping("/{id}")
    public ResponseEntity<TechnologyResponse>
    updateTechnology(
            @PathVariable Long id,
            @RequestBody TechnologyRequest request
    ) {

        return ResponseEntity.ok(
                technologyService.update(
                        id,
                        request
                )
        );
    }

    // ============================================================
    // DELETE TECHNOLOGY
    // ============================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTechnology(
            @PathVariable Long id
    ) {

        technologyService.delete(id);

        return ResponseEntity.ok(
                "Technology deleted successfully"
        );
    }
}
