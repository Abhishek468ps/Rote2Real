package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.dto.request.CreateMvpPlanRequest;
import com.braintrain.mvp.dto.request.UpdateMvpPlanRequest;
import com.braintrain.mvp.dto.response.MvpPlanResponse;
import com.braintrain.mvp.entity.Mvp;
import com.braintrain.mvp.entity.MvpPlan;
import com.braintrain.mvp.repository.MvpPlanRepository;
import com.braintrain.mvp.repository.MvpRepository;
import com.braintrain.mvp.service.MvpPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MvpPlanServiceImpl
        implements MvpPlanService {

    private final MvpPlanRepository mvpPlanRepository;

    private final MvpRepository mvpRepository;

    @Override
    public MvpPlanResponse createPlan(
            Long mvpId,
            CreateMvpPlanRequest request
    ) {

        Mvp mvp = mvpRepository.findById(mvpId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "MVP not found with id: " + mvpId
                        )
                );

        String code = normalizeCode(request.getCode());

        if (mvpPlanRepository.existsByMvpIdAndCode(
                mvpId,
                code
        )) {
            throw new RuntimeException(
                    "Plan code already exists for this MVP: "
                            + code
            );
        }

        validatePlan(request);

        MvpPlan plan = MvpPlan.builder()
                .mvp(mvp)
                .code(code)
                .name(request.getName())
                .durationHours(request.getDurationHours())
                .price(
                        request.getPrice() != null
                                ? request.getPrice()
                                : java.math.BigDecimal.ZERO
                )
                .currency(
                        request.getCurrency() != null
                                ? request.getCurrency().toUpperCase()
                                : "INR"
                )
               .free(Boolean.TRUE.equals(request.getFree()))
                .description(request.getDescription())
                .maxTeamSize(
                        request.getMaxTeamSize() != null
                                ? request.getMaxTeamSize()
                                : 1
                )
               .certificateEnabled(
        Boolean.TRUE.equals(request.getCertificateEnabled())
)
                .portfolioEnabled(
        Boolean.TRUE.equals(request.getPortfolioEnabled())
)
                .mentorEnabled(
                        Boolean.TRUE.equals(request.getMentorEnabled()
                ))

 .aiMentorEnabled(
        Boolean.TRUE.equals(request.getAiMentorEnabled())
)
.active(
        request.getActive() == null || request.getActive()
)
.displayOrder(
        request.getDisplayOrder() != null
                ? request.getDisplayOrder()
                : 0
)
.build();

        MvpPlan savedPlan =
                mvpPlanRepository.save(plan);

        return mapToResponse(savedPlan);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MvpPlanResponse> getPlans(
            Long mvpId
    ) {

        ensureMvpExists(mvpId);

        return mvpPlanRepository
                .findByMvpIdOrderByDisplayOrderAscDurationHoursAsc(mvpId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MvpPlanResponse> getActivePlans(
            Long mvpId
    ) {

        ensureMvpExists(mvpId);

        return mvpPlanRepository
               .findByMvpIdAndActiveTrueOrderByDisplayOrderAscDurationHoursAsc(
        mvpId
)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public MvpPlanResponse getPlan(
            Long mvpId,
            Long planId
    ) {

        MvpPlan plan =
                mvpPlanRepository
                        .findByIdAndMvpId(
                                planId,
                                mvpId
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "MVP Plan not found"
                                )
                        );

        return mapToResponse(plan);
    }

    @Override
    public MvpPlanResponse updatePlan(
            Long mvpId,
            Long planId,
            UpdateMvpPlanRequest request
    ) {

        MvpPlan plan =
                mvpPlanRepository
                        .findByIdAndMvpId(
                                planId,
                                mvpId
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "MVP Plan not found"
                                )
                        );

        String code =
                normalizeCode(request.getCode());

        if (mvpPlanRepository
                .existsByMvpIdAndCodeAndIdNot(
                        mvpId,
                        code,
                        planId
                )) {

            throw new RuntimeException(
                    "Another plan already uses code: "
                            + code
            );
        }

        validatePlan(request);

        plan.setCode(code);
        plan.setName(request.getName());
        plan.setDurationHours(
                request.getDurationHours()
        );

        plan.setPrice(
                request.getPrice() != null
                        ? request.getPrice()
                        : java.math.BigDecimal.ZERO
        );

        plan.setCurrency(
                request.getCurrency() != null
                        ? request.getCurrency().toUpperCase()
                        : "INR"
        );

        plan.setFree(request.isFree());

        plan.setDescription(
                request.getDescription()
        );

        plan.setMaxTeamSize(
                request.getMaxTeamSize() != null
                        ? request.getMaxTeamSize()
                        : 1
        );

        plan.setCertificateEnabled(
                request.isCertificateEnabled()
        );

        plan.setPortfolioEnabled(
                request.isPortfolioEnabled()
        );

        plan.setMentorEnabled(
                request.isMentorEnabled()
        );

        plan.setAiMentorEnabled(
                request.isAiMentorEnabled()
        );

        plan.setActive(
                request.isActive()
        );

        plan.setDisplayOrder(
        request.getDisplayOrder() != null
                ? request.getDisplayOrder()
                : 0
);

        MvpPlan updatedPlan =
                mvpPlanRepository.save(plan);

        return mapToResponse(updatedPlan);
    }

    @Override
    public void deletePlan(
            Long mvpId,
            Long planId
    ) {

        MvpPlan plan =
                mvpPlanRepository
                        .findByIdAndMvpId(
                                planId,
                                mvpId
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "MVP Plan not found"
                                )
                        );

        mvpPlanRepository.delete(plan);
    }

    private void ensureMvpExists(Long mvpId) {

        if (!mvpRepository.existsById(mvpId)) {

            throw new RuntimeException(
                    "MVP not found with id: " + mvpId
            );
        }
    }

    private String normalizeCode(String code) {

        if (code == null || code.isBlank()) {

            throw new RuntimeException(
                    "Plan code is required"
            );
        }

        return code
                .trim()
                .toUpperCase()
                .replace(" ", "_");
    }

    private void validatePlan(
            CreateMvpPlanRequest request
    ) {

        if (request.getName() == null
                || request.getName().isBlank()) {

            throw new RuntimeException(
                    "Plan name is required"
            );
        }

        if (request.getDurationHours() == null
                || request.getDurationHours() <= 0) {

            throw new RuntimeException(
                    "Duration hours must be greater than 0"
            );
        }

        if (request.getPrice() != null
                && request.getPrice().signum() < 0) {

            throw new RuntimeException(
                    "Price cannot be negative"
            );
        }

        if (request.getMaxTeamSize() != null
                && request.getMaxTeamSize() <= 0) {

            throw new RuntimeException(
                    "Maximum team size must be greater than 0"
            );
        }

        if (Boolean.TRUE.equals(request.getFree())) {

            if (request.getPrice() != null
                    && request.getPrice().signum() > 0) {

                throw new RuntimeException(
                        "Free plan cannot have a price greater than 0"
                );
            }
        }
    }

    private void validatePlan(
            UpdateMvpPlanRequest request
    ) {

        if (request.getName() == null
                || request.getName().isBlank()) {

            throw new RuntimeException(
                    "Plan name is required"
            );
        }

        if (request.getDurationHours() == null
                || request.getDurationHours() <= 0) {

            throw new RuntimeException(
                    "Duration hours must be greater than 0"
            );
        }

        if (request.getPrice() != null
                && request.getPrice().signum() < 0) {

            throw new RuntimeException(
                    "Price cannot be negative"
            );
        }

        if (request.getMaxTeamSize() != null
                && request.getMaxTeamSize() <= 0) {

            throw new RuntimeException(
                    "Maximum team size must be greater than 0"
            );
        }

        if (request.isFree()) {

            if (request.getPrice() != null
                    && request.getPrice().signum() > 0) {

                throw new RuntimeException(
                        "Free plan cannot have a price greater than 0"
                );
            }
        }
    }

    private MvpPlanResponse mapToResponse(
            MvpPlan plan
    ) {

        return MvpPlanResponse.builder()

                .id(plan.getId())

                .mvpId(
                        plan.getMvp() != null
                                ? plan.getMvp().getId()
                                : null
                )

.mvpCode(
        plan.getMvp() != null
                ? plan.getMvp().getMvpCode()
                : null
)

                .code(plan.getCode())

                .name(plan.getName())

                .durationHours(
                        plan.getDurationHours()
                )

                .price(plan.getPrice())

                .currency(plan.getCurrency())

                .free(plan.isFree())

                .description(
                        plan.getDescription()
                )

                .maxTeamSize(
                        plan.getMaxTeamSize()
                )

                .certificateEnabled(
                        plan.isCertificateEnabled()
                )

                .portfolioEnabled(
                        plan.isPortfolioEnabled()
                )

                .mentorEnabled(
                        plan.isMentorEnabled()
                )

                .aiMentorEnabled(
                        plan.isAiMentorEnabled()
                )

                .active(
                        plan.isActive()
                )

                .displayOrder(
        plan.getDisplayOrder()
)

                .createdAt(
                        plan.getCreatedAt()
                )

                .updatedAt(
                        plan.getUpdatedAt()
                )

                .build();
    }
}
