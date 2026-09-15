package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.dto.request.CreateMvpTaskRequest;
import com.braintrain.mvp.dto.request.UpdateMvpTaskRequest;
import com.braintrain.mvp.dto.response.MvpTaskResponse;
import com.braintrain.mvp.entity.MvpModule;
import com.braintrain.mvp.entity.MvpTask;
import com.braintrain.mvp.enums.MvpTaskPriority;
import com.braintrain.mvp.enums.MvpTaskStatus;
import com.braintrain.mvp.enums.MvpTaskType;
import com.braintrain.mvp.repository.MvpModuleRepository;
import com.braintrain.mvp.repository.MvpTaskRepository;
import com.braintrain.mvp.service.MvpTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MvpTaskServiceImpl
        implements MvpTaskService {

    private final MvpTaskRepository mvpTaskRepository;

    private final MvpModuleRepository mvpModuleRepository;


    @Override
    public MvpTaskResponse createTask(
            Long moduleId,
            CreateMvpTaskRequest request
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
                    "Task title is required"
            );
        }


        if (request.getTaskType() == null ||
                request.getTaskType().isBlank()) {

            throw new RuntimeException(
                    "Task type is required"
            );
        }


        if (request.getSequenceNumber() == null ||
                request.getSequenceNumber() < 1) {

            throw new RuntimeException(
                    "Sequence number must be greater than 0"
            );
        }


        if (
                mvpTaskRepository
                        .existsByModuleIdAndSequenceNumber(
                                moduleId,
                                request.getSequenceNumber()
                        )
        ) {

            throw new RuntimeException(
                    "Task sequence number already exists"
            );
        }


        MvpTask task = new MvpTask();

        task.setModule(module);

        task.setTitle(
                request.getTitle()
        );

        task.setDescription(
                request.getDescription()
        );

        task.setTaskType(
                MvpTaskType.valueOf(
                        request.getTaskType()
                                .toUpperCase()
                )
        );


        if (request.getPriority() != null &&
                !request.getPriority().isBlank()) {

            task.setPriority(
                    MvpTaskPriority.valueOf(
                            request.getPriority()
                                    .toUpperCase()
                    )
            );
        }


        task.setDifficulty(
                request.getDifficulty()
        );

        task.setEstimatedMinutes(
                request.getEstimatedMinutes()
        );

        task.setSequenceNumber(
                request.getSequenceNumber()
        );


        if (request.getMandatory() != null) {

            task.setMandatory(
                    request.getMandatory()
            );
        }


        if (request.getSubmissionRequired() != null) {

            task.setSubmissionRequired(
                    request.getSubmissionRequired()
            );
        }


        if (request.getGithubRequired() != null) {

            task.setGithubRequired(
                    request.getGithubRequired()
            );
        }


        task.setDeadlineOffsetHours(
                request.getDeadlineOffsetHours()
        );


        if (request.getXpReward() != null) {

            task.setXpReward(
                    request.getXpReward()
            );
        }


        task.setStatus(
                MvpTaskStatus.ACTIVE
        );


        MvpTask saved =
                mvpTaskRepository.save(task);

        return mapToResponse(saved);
    }


    @Override
    @Transactional(readOnly = true)
    public List<MvpTaskResponse> getTasksByModule(
            Long moduleId
    ) {

        if (!mvpModuleRepository.existsById(moduleId)) {

            throw new RuntimeException(
                    "Module not found: " + moduleId
            );
        }


        return mvpTaskRepository
                .findByModuleIdOrderBySequenceNumberAsc(
                        moduleId
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    @Override
    @Transactional(readOnly = true)
    public MvpTaskResponse getTask(
            Long taskId
    ) {

        MvpTask task =
                mvpTaskRepository.findById(taskId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Task not found: "
                                                + taskId
                                )
                        );

        return mapToResponse(task);
    }


    @Override
    public MvpTaskResponse updateTask(
            Long taskId,
            UpdateMvpTaskRequest request
    ) {

        MvpTask task =
                mvpTaskRepository.findById(taskId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Task not found: "
                                                + taskId
                                )
                        );


        if (request.getTitle() == null ||
                request.getTitle().isBlank()) {

            throw new RuntimeException(
                    "Task title is required"
            );
        }


        if (request.getTaskType() == null ||
                request.getTaskType().isBlank()) {

            throw new RuntimeException(
                    "Task type is required"
            );
        }


        if (request.getSequenceNumber() == null ||
                request.getSequenceNumber() < 1) {

            throw new RuntimeException(
                    "Sequence number must be greater than 0"
            );
        }


        if (
                mvpTaskRepository
                        .existsByModuleIdAndSequenceNumberAndIdNot(
                                task.getModule().getId(),
                                request.getSequenceNumber(),
                                taskId
                        )
        ) {

            throw new RuntimeException(
                    "Task sequence number already exists"
            );
        }


        task.setTitle(
                request.getTitle()
        );

        task.setDescription(
                request.getDescription()
        );

        task.setTaskType(
                MvpTaskType.valueOf(
                        request.getTaskType()
                                .toUpperCase()
                )
        );


        if (request.getPriority() != null &&
                !request.getPriority().isBlank()) {

            task.setPriority(
                    MvpTaskPriority.valueOf(
                            request.getPriority()
                                    .toUpperCase()
                    )
            );
        }


        task.setDifficulty(
                request.getDifficulty()
        );

        task.setEstimatedMinutes(
                request.getEstimatedMinutes()
        );

        task.setSequenceNumber(
                request.getSequenceNumber()
        );


        if (request.getMandatory() != null) {

            task.setMandatory(
                    request.getMandatory()
            );
        }


        if (request.getSubmissionRequired() != null) {

            task.setSubmissionRequired(
                    request.getSubmissionRequired()
            );
        }


        if (request.getGithubRequired() != null) {

            task.setGithubRequired(
                    request.getGithubRequired()
            );
        }


        task.setDeadlineOffsetHours(
                request.getDeadlineOffsetHours()
        );


        if (request.getXpReward() != null) {

            task.setXpReward(
                    request.getXpReward()
            );
        }


        if (request.getStatus() != null &&
                !request.getStatus().isBlank()) {

            task.setStatus(
                    MvpTaskStatus.valueOf(
                            request.getStatus()
                                    .toUpperCase()
                    )
            );
        }


        MvpTask updated =
                mvpTaskRepository.save(task);

        return mapToResponse(updated);
    }


    @Override
    public void deleteTask(
            Long taskId
    ) {

        if (!mvpTaskRepository.existsById(taskId)) {

            throw new RuntimeException(
                    "Task not found: " + taskId
            );
        }


        mvpTaskRepository.deleteById(taskId);
    }


    private MvpTaskResponse mapToResponse(
            MvpTask task
    ) {

        MvpTaskResponse response =
                new MvpTaskResponse();


        response.setId(
                task.getId()
        );

        response.setModuleId(
                task.getModule().getId()
        );

        response.setModuleTitle(
                task.getModule().getTitle()
        );

        response.setMvpId(
                task.getModule()
                        .getMvp()
                        .getId()
        );

        response.setTitle(
                task.getTitle()
        );

        response.setDescription(
                task.getDescription()
        );

        response.setTaskType(
                task.getTaskType()
        );

        response.setPriority(
                task.getPriority()
        );

        response.setDifficulty(
                task.getDifficulty()
        );

        response.setEstimatedMinutes(
                task.getEstimatedMinutes()
        );

        response.setSequenceNumber(
                task.getSequenceNumber()
        );

        response.setMandatory(
                task.isMandatory()
        );

        response.setSubmissionRequired(
                task.isSubmissionRequired()
        );

        response.setGithubRequired(
                task.isGithubRequired()
        );

        response.setDeadlineOffsetHours(
                task.getDeadlineOffsetHours()
        );

        response.setXpReward(
                task.getXpReward()
        );

        response.setStatus(
                task.getStatus()
        );

        response.setCreatedAt(
                task.getCreatedAt()
        );

        response.setUpdatedAt(
                task.getUpdatedAt()
        );

        return response;
    }
}
