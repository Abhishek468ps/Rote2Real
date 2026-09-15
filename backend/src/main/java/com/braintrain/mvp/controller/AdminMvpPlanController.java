
package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.request.CreateMvpPlanRequest;
import com.braintrain.mvp.dto.request.UpdateMvpPlanRequest;
import com.braintrain.mvp.dto.response.MvpPlanResponse;
import com.braintrain.mvp.service.MvpPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/mvps")
@RequiredArgsConstructor
public class AdminMvpPlanController {

    private final MvpPlanService mvpPlanService;

    /*
     * ==========================================
     * CREATE PLAN
     * ==========================================
     *
     * POST
     * /api/admin/mvps/{mvpId}/plans
     */
    @PostMapping("/{mvpId}/plans")
    public ResponseEntity<MvpPlanResponse> createPlan(
            @PathVariable Long mvpId,
            @RequestBody CreateMvpPlanRequest request
    ) {

        MvpPlanResponse response =
                mvpPlanService.createPlan(
                        mvpId,
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    /*
     * ==========================================
     * GET ALL PLANS
     * ==========================================
     *
     * GET
     * /api/admin/mvps/{mvpId}/plans
     */
    @GetMapping("/{mvpId}/plans")
    public ResponseEntity<List<MvpPlanResponse>> getPlans(
            @PathVariable Long mvpId
    ) {

        return ResponseEntity.ok(
                mvpPlanService.getPlans(mvpId)
        );
    }

    /*
     * ==========================================
     * GET ACTIVE PLANS
     * ==========================================
     *
     * GET
     * /api/admin/mvps/{mvpId}/plans/active
     */
    @GetMapping("/{mvpId}/plans/active")
    public ResponseEntity<List<MvpPlanResponse>> getActivePlans(
            @PathVariable Long mvpId
    ) {

        return ResponseEntity.ok(
                mvpPlanService.getActivePlans(mvpId)
        );
    }

    /*
     * ==========================================
     * GET PLAN BY ID
     * ==========================================
     *
     * GET
     * /api/admin/mvps/{mvpId}/plans/{planId}
     */
    @GetMapping("/{mvpId}/plans/{planId}")
    public ResponseEntity<MvpPlanResponse> getPlan(
            @PathVariable Long mvpId,
            @PathVariable Long planId
    ) {

        return ResponseEntity.ok(
                mvpPlanService.getPlan(
                        mvpId,
                        planId
                )
        );
    }

    /*
     * ==========================================
     * UPDATE PLAN
     * ==========================================
     *
     * PUT
     * /api/admin/mvps/{mvpId}/plans/{planId}
     */
    @PutMapping("/{mvpId}/plans/{planId}")
    public ResponseEntity<MvpPlanResponse> updatePlan(
            @PathVariable Long mvpId,
            @PathVariable Long planId,
            @RequestBody UpdateMvpPlanRequest request
    ) {

        return ResponseEntity.ok(
                mvpPlanService.updatePlan(
                        mvpId,
                        planId,
                        request
                )
        );
    }

    /*
     * ==========================================
     * DELETE PLAN
     * ==========================================
     *
     * DELETE
     * /api/admin/mvps/{mvpId}/plans/{planId}
     */
    @DeleteMapping("/{mvpId}/plans/{planId}")
    public ResponseEntity<String> deletePlan(
            @PathVariable Long mvpId,
            @PathVariable Long planId
    ) {

        mvpPlanService.deletePlan(
                mvpId,
                planId
        );

        return ResponseEntity.ok(
                "MVP plan deleted successfully"
        );
    }
}