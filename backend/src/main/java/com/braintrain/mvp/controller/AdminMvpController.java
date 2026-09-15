package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.request.CreateMvpRequest;
import com.braintrain.mvp.dto.response.MvpResponse;
import com.braintrain.mvp.enums.MvpStatus;
import com.braintrain.mvp.service.MvpService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/mvps")
@RequiredArgsConstructor
public class AdminMvpController {


    private final MvpService mvpService;


    // ==========================================
    // GET ALL MVPS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<MvpResponse>>
    getAllMvps() {

        return ResponseEntity.ok(
                mvpService.getAllMvps()
        );
    }


    // ==========================================
    // GET MVPS BY STATUS
    //
    // Example:
    // /api/admin/mvps/status/DRAFT
    // /api/admin/mvps/status/PUBLISHED
    // /api/admin/mvps/status/ARCHIVED
    // ==========================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<MvpResponse>>
    getMvpsByStatus(
            @PathVariable MvpStatus status
    ) {

        return ResponseEntity.ok(
                mvpService.getMvpsByStatus(
                        status
                )
        );
    }


    // ==========================================
    // GET MVP BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<MvpResponse>
    getMvpById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                mvpService.getMvpById(id)
        );
    }


    // ==========================================
    // CREATE MVP
    // ==========================================

    @PostMapping
    public ResponseEntity<MvpResponse>
    createMvp(
            @RequestBody CreateMvpRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        mvpService.createMvp(
                                request
                        )
                );
    }


    // ==========================================
    // UPDATE MVP
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<MvpResponse>
    updateMvp(
            @PathVariable Long id,
            @RequestBody CreateMvpRequest request
    ) {

        return ResponseEntity.ok(
                mvpService.updateMvp(
                        id,
                        request
                )
        );
    }


    // ==========================================
    // DELETE MVP
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMvp(
            @PathVariable Long id
    ) {

        mvpService.deleteMvp(id);

        return ResponseEntity.ok(
                "MVP deleted successfully"
        );
    }
}
