package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.request.CreateMvpTaskRequest;
import com.braintrain.mvp.dto.request.UpdateMvpTaskRequest;
import com.braintrain.mvp.dto.response.MvpTaskResponse;

import java.util.List;

public interface MvpTaskService {

    MvpTaskResponse createTask(
            Long moduleId,
            CreateMvpTaskRequest request
    );

    List<MvpTaskResponse> getTasksByModule(
            Long moduleId
    );

    MvpTaskResponse getTask(
            Long taskId
    );

    MvpTaskResponse updateTask(
            Long taskId,
            UpdateMvpTaskRequest request
    );

    void deleteTask(
            Long taskId
    );
}