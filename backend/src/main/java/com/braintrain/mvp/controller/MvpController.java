/*package com.braintrain.mvp.controller;

import com.braintrain.mvp.entity.Mvp;
import com.braintrain.mvp.entity.MvpPlan;
import com.braintrain.mvp.enums.MvpStatus;
import com.braintrain.mvp.repository.MvpPlanRepository;
import com.braintrain.mvp.repository.MvpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mvps")
@RequiredArgsConstructor
public class MvpController {

    private final MvpRepository mvpRepository;
    private final MvpPlanRepository mvpPlanRepository;
   
    // ============================================================
    // GET ACTIVE MVPS
    // ============================================================

    @GetMapping
    public ResponseEntity<List<Mvp>> getActiveMvps() {

        List<Mvp> mvps =
            mvpRepository.findByStatusWithDomain(
                MvpStatus.PUBLISHED
            );

        return ResponseEntity.ok(mvps);
    }

    // ============================================================
    // GET MVP BY ID
    // ============================================================

    @GetMapping("/{mvpId}")
    public ResponseEntity<Mvp> getMvpById(
            @PathVariable Long mvpId
    ) {

        Mvp mvp = mvpRepository
            .findByIdWithDomain(mvpId)
            .filter(m -> m.getStatus() == MvpStatus.PUBLISHED)
            .orElseThrow(() ->
                new RuntimeException(
                    "MVP not found or not published"
                )
            );

        return ResponseEntity.ok(mvp);
    }

    // ============================================================
    // GET PLANS FOR MVP
    // ============================================================

    @GetMapping("/{mvpId}/plans")
    public ResponseEntity<List<MvpPlan>> getPlans(
            @PathVariable Long mvpId
    ) {

        mvpRepository
            .findByIdWithDomain(mvpId)
            .filter(m -> m.getStatus() == MvpStatus.PUBLISHED)
            .orElseThrow(() ->
                new RuntimeException(
                    "MVP not found or not published"
                )
            );

        List<MvpPlan> plans =
            mvpPlanRepository
                .findByMvpIdAndActiveTrueOrderByDisplayOrderAscDurationHoursAsc(
                    mvpId
                );

        return ResponseEntity.ok(plans);
    }
}*/

package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.response.MvpResponse;
import com.braintrain.mvp.entity.MvpPlan;
import com.braintrain.mvp.enums.MvpStatus;
import com.braintrain.mvp.repository.MvpPlanRepository;
import com.braintrain.mvp.service.MvpService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mvps")
@RequiredArgsConstructor
public class MvpController {

    private final MvpService mvpService;
    private final MvpPlanRepository mvpPlanRepository;

    // ============================================================
    // GET ACTIVE / PUBLISHED MVPS
    // ============================================================

    @GetMapping
    public ResponseEntity<List<MvpResponse>> getActiveMvps() {

        List<MvpResponse> mvps =
                mvpService.getMvpsByStatus(
                        MvpStatus.PUBLISHED
                );

        return ResponseEntity.ok(mvps);
    }

    // ============================================================
    // GET MVP BY ID
    // ============================================================

    @GetMapping("/{mvpId}")
    public ResponseEntity<MvpResponse> getMvpById(
            @PathVariable Long mvpId
    ) {

        MvpResponse mvp =
                mvpService.getMvpById(mvpId);

        return ResponseEntity.ok(mvp);
    }

    // ============================================================
    // GET PLANS FOR MVP
    // ============================================================

    @GetMapping("/{mvpId}/plans")
    public ResponseEntity<List<MvpPlan>> getPlans(
            @PathVariable Long mvpId
    ) {

        List<MvpPlan> plans =
                mvpPlanRepository
                        .findByMvpIdAndActiveTrueOrderByDisplayOrderAscDurationHoursAsc(
                                mvpId
                        );

        return ResponseEntity.ok(plans);
    }
}