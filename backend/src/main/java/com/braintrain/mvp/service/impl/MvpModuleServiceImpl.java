package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.dto.request.CreateMvpModuleRequest;
import com.braintrain.mvp.dto.request.UpdateMvpModuleRequest;
import com.braintrain.mvp.dto.response.MvpModuleResponse;
import com.braintrain.mvp.entity.Mvp;
import com.braintrain.mvp.entity.MvpModule;
import com.braintrain.mvp.enums.MvpModuleStatus;
import com.braintrain.mvp.repository.MvpModuleRepository;
import com.braintrain.mvp.repository.MvpRepository;
import com.braintrain.mvp.service.MvpModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MvpModuleServiceImpl
        implements MvpModuleService {

    private final MvpModuleRepository mvpModuleRepository;

    private final MvpRepository mvpRepository;


    @Override
    public MvpModuleResponse createModule(
            Long mvpId,
            CreateMvpModuleRequest request
    ) {

        Mvp mvp = mvpRepository.findById(mvpId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "MVP not found: " + mvpId
                        )
                );


        if (request.getTitle() == null ||
                request.getTitle().isBlank()) {

            throw new RuntimeException(
                    "Module title is required"
            );
        }


        if (request.getModuleNumber() == null ||
                request.getModuleNumber() < 1) {

            throw new RuntimeException(
                    "Module number must be greater than 0"
            );
        }


        if (
                mvpModuleRepository
                        .existsByMvpIdAndModuleNumber(
                                mvpId,
                                request.getModuleNumber()
                        )
        ) {

            throw new RuntimeException(
                    "Module number already exists for this MVP"
            );
        }


        MvpModule module = new MvpModule();

        module.setMvp(mvp);
        module.setTitle(request.getTitle());
        module.setDescription(request.getDescription());
        module.setModuleNumber(request.getModuleNumber());
        module.setEstimatedHours(
                request.getEstimatedHours()
        );
        module.setDifficulty(
                request.getDifficulty()
        );
        module.setLearningObjectives(
                request.getLearningObjectives()
        );
        module.setDeliverables(
                request.getDeliverables()
        );
        module.setStatus(
                MvpModuleStatus.ACTIVE
        );


        MvpModule saved =
                mvpModuleRepository.save(module);

        return mapToResponse(saved);
    }


    @Override
    @Transactional(readOnly = true)
    public List<MvpModuleResponse> getModulesByMvp(
            Long mvpId
    ) {

        if (!mvpRepository.existsById(mvpId)) {

            throw new RuntimeException(
                    "MVP not found: " + mvpId
            );
        }


        return mvpModuleRepository
                .findByMvpIdOrderByModuleNumberAsc(mvpId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    @Override
    @Transactional(readOnly = true)
    public MvpModuleResponse getModule(
            Long moduleId
    ) {

        MvpModule module =
                mvpModuleRepository.findById(moduleId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Module not found: "
                                                + moduleId
                                )
                        );

        return mapToResponse(module);
    }


    @Override
    public MvpModuleResponse updateModule(
            Long moduleId,
            UpdateMvpModuleRequest request
    ) {

        MvpModule module =
                mvpModuleRepository.findById(moduleId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Module not found: "
                                                + moduleId
                                )
                        );


        if (request.getTitle() == null ||
                request.getTitle().isBlank()) {

            throw new RuntimeException(
                    "Module title is required"
            );
        }


        if (request.getModuleNumber() == null ||
                request.getModuleNumber() < 1) {

            throw new RuntimeException(
                    "Module number must be greater than 0"
            );
        }


        if (
                mvpModuleRepository
                        .existsByMvpIdAndModuleNumberAndIdNot(
                                module.getMvp().getId(),
                                request.getModuleNumber(),
                                moduleId
                        )
        ) {

            throw new RuntimeException(
                    "Module number already exists for this MVP"
            );
        }


        module.setTitle(
                request.getTitle()
        );

        module.setDescription(
                request.getDescription()
        );

        module.setModuleNumber(
                request.getModuleNumber()
        );

        module.setEstimatedHours(
                request.getEstimatedHours()
        );

        module.setDifficulty(
                request.getDifficulty()
        );

        module.setLearningObjectives(
                request.getLearningObjectives()
        );

        module.setDeliverables(
                request.getDeliverables()
        );


        if (request.getStatus() != null) {

            module.setStatus(
                    MvpModuleStatus.valueOf(
                            request.getStatus()
                                    .toUpperCase()
                    )
            );
        }


        MvpModule updated =
                mvpModuleRepository.save(module);

        return mapToResponse(updated);
    }


    @Override
    public void deleteModule(
            Long moduleId
    ) {

        if (!mvpModuleRepository.existsById(moduleId)) {

            throw new RuntimeException(
                    "Module not found: " + moduleId
            );
        }


        mvpModuleRepository.deleteById(moduleId);
    }


    private MvpModuleResponse mapToResponse(
            MvpModule module
    ) {

        MvpModuleResponse response =
                new MvpModuleResponse();

        response.setId(
                module.getId()
        );

        response.setMvpId(
                module.getMvp().getId()
        );

        response.setMvpTitle(
                module.getMvp().getTitle()
        );

        response.setTitle(
                module.getTitle()
        );

        response.setDescription(
                module.getDescription()
        );

        response.setModuleNumber(
                module.getModuleNumber()
        );

        response.setEstimatedHours(
                module.getEstimatedHours()
        );

        response.setDifficulty(
                module.getDifficulty()
        );

        response.setLearningObjectives(
                module.getLearningObjectives()
        );

        response.setDeliverables(
                module.getDeliverables()
        );

        response.setStatus(
                module.getStatus()
        );

        response.setCreatedAt(
                module.getCreatedAt()
        );

        response.setUpdatedAt(
                module.getUpdatedAt()
        );

        return response;
    }
}