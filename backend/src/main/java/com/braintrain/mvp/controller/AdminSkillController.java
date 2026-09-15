package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.request.SkillRequest;
import com.braintrain.mvp.dto.response.SkillResponse;
import com.braintrain.mvp.service.SkillService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/skills")
@RequiredArgsConstructor
public class AdminSkillController {

    private final SkillService skillService;

    // ============================================================
    // GET ALL SKILLS
    // ============================================================

    @GetMapping
    public ResponseEntity<List<SkillResponse>> getAllSkills() {

        return ResponseEntity.ok(
                skillService.getAll()
        );
    }

     @GetMapping("/active")
    public ResponseEntity<List<SkillResponse>> getActive() {

        return ResponseEntity.ok(
                skillService.getActive()
        );
    }

    // ============================================================
    // GET SKILL BY ID
    // ============================================================

    @GetMapping("/{id}")
    public ResponseEntity<SkillResponse> getSkillById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                skillService.getById(id)
        );
    }

    // ============================================================
    // CREATE SKILL
    // ============================================================

    @PostMapping
    public ResponseEntity<SkillResponse> createSkill(
            @RequestBody SkillRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        skillService.create(request)
                );
    }

    // ============================================================
    // UPDATE SKILL
    // ============================================================

    @PutMapping("/{id}")
    public ResponseEntity<SkillResponse> updateSkill(
            @PathVariable Long id,
            @RequestBody SkillRequest request
    ) {

        return ResponseEntity.ok(
                skillService.update(id, request)
        );
    }

    // ============================================================
    // DELETE SKILL
    // ============================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSkill(
            @PathVariable Long id
    ) {

        skillService.delete(id);

        return ResponseEntity.ok(
                "Skill deleted successfully"
        );
    }
}