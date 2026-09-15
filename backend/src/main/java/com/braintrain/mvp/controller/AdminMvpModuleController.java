package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.request.CreateMvpModuleRequest;
import com.braintrain.mvp.dto.request.UpdateMvpModuleRequest;
import com.braintrain.mvp.dto.response.MvpModuleResponse;
import com.braintrain.mvp.service.MvpModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/mvps")
@RequiredArgsConstructor
public class AdminMvpModuleController {


    private final MvpModuleService mvpModuleService;


    // ==========================================
    // CREATE MODULE
    // ==========================================

    @PostMapping("/{mvpId}/modules")
    public ResponseEntity<MvpModuleResponse> createModule(
            @PathVariable Long mvpId,
            @RequestBody CreateMvpModuleRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        mvpModuleService.createModule(
                                mvpId,
                                request
                        )
                );
    }


    // ==========================================
    // GET ALL MODULES OF MVP
    // ==========================================

    @GetMapping("/{mvpId}/modules")
    public ResponseEntity<List<MvpModuleResponse>> getModules(
            @PathVariable Long mvpId
    ) {

        return ResponseEntity.ok(
                mvpModuleService.getModulesByMvp(
                        mvpId
                )
        );
    }


    // ==========================================
    // GET MODULE
    // ==========================================

    @GetMapping("/modules/{moduleId}")
    public ResponseEntity<MvpModuleResponse> getModule(
            @PathVariable Long moduleId
    ) {

        return ResponseEntity.ok(
                mvpModuleService.getModule(
                        moduleId
                )
        );
    }


    // ==========================================
    // UPDATE MODULE
    // ==========================================

    @PutMapping("/modules/{moduleId}")
    public ResponseEntity<MvpModuleResponse> updateModule(
            @PathVariable Long moduleId,
            @RequestBody UpdateMvpModuleRequest request
    ) {

        return ResponseEntity.ok(
                mvpModuleService.updateModule(
                        moduleId,
                        request
                )
        );
    }


    // ==========================================
    // DELETE MODULE
    // ==========================================

    @DeleteMapping("/modules/{moduleId}")
    public ResponseEntity<String> deleteModule(
            @PathVariable Long moduleId
    ) {

        mvpModuleService.deleteModule(
                moduleId
        );

        return ResponseEntity.ok(
                "Module deleted successfully"
        );
    }
}