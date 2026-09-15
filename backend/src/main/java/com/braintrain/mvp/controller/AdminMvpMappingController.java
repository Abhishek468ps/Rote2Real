package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.response.MvpSkillResponse;
import com.braintrain.mvp.dto.response.MvpTechnologyResponse;
import com.braintrain.mvp.service.MvpMappingService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/mvps")
@RequiredArgsConstructor
public class AdminMvpMappingController {

    private final MvpMappingService mvpMappingService;

    // ============================================================
    // MVP SKILLS
    // ============================================================

    @GetMapping("/{mvpId}/skills")
    public ResponseEntity<List<MvpSkillResponse>> getSkills(
            @PathVariable Long mvpId
    ) {

        return ResponseEntity.ok(
                mvpMappingService.getSkills(mvpId)
        );
    }

    @PostMapping("/{mvpId}/skills/{skillId}")
    public ResponseEntity<MvpSkillResponse> addSkill(
            @PathVariable Long mvpId,
            @PathVariable Long skillId
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        mvpMappingService.addSkill(
                                mvpId,
                                skillId
                        )
                );
    }

    @DeleteMapping("/{mvpId}/skills/{skillId}")
    public ResponseEntity<Void> removeSkill(
            @PathVariable Long mvpId,
            @PathVariable Long skillId
    ) {

        mvpMappingService.removeSkill(
                mvpId,
                skillId
        );

        return ResponseEntity.noContent().build();
    }

    // ============================================================
    // MVP TECHNOLOGIES
    // ============================================================

    @GetMapping("/{mvpId}/technologies")
    public ResponseEntity<List<MvpTechnologyResponse>>
    getTechnologies(
            @PathVariable Long mvpId
    ) {

        return ResponseEntity.ok(
                mvpMappingService.getTechnologies(
                        mvpId
                )
        );
    }

    @PostMapping("/{mvpId}/technologies/{technologyId}")
    public ResponseEntity<MvpTechnologyResponse>
    addTechnology(
            @PathVariable Long mvpId,
            @PathVariable Long technologyId
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        mvpMappingService.addTechnology(
                                mvpId,
                                technologyId
                        )
                );
    }

    @DeleteMapping(
            "/{mvpId}/technologies/{technologyId}"
    )
    public ResponseEntity<Void> removeTechnology(
            @PathVariable Long mvpId,
            @PathVariable Long technologyId
    ) {

        mvpMappingService.removeTechnology(
                mvpId,
                technologyId
        );

        return ResponseEntity.noContent().build();
    }
}