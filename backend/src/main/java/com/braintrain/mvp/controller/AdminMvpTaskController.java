package com.braintrain.mvp.controller;

import com.braintrain.mvp.dto.request.CreateMvpTaskRequest;
import com.braintrain.mvp.dto.request.UpdateMvpTaskRequest;
import com.braintrain.mvp.dto.response.MvpTaskResponse;
import com.braintrain.mvp.service.MvpTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/mvp-modules")
@RequiredArgsConstructor
public class AdminMvpTaskController {


    private final MvpTaskService mvpTaskService;


    // ==========================================
    // CREATE TASK
    // ==========================================

    @PostMapping("/{moduleId}/tasks")
    public ResponseEntity<MvpTaskResponse> createTask(
            @PathVariable Long moduleId,
            @RequestBody CreateMvpTaskRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        mvpTaskService.createTask(
                                moduleId,
                                request
                        )
                );
    }


    // ==========================================
    // GET ALL TASKS
    // ==========================================

    @GetMapping("/{moduleId}/tasks")
    public ResponseEntity<List<MvpTaskResponse>> getTasks(
            @PathVariable Long moduleId
    ) {

        return ResponseEntity.ok(
                mvpTaskService.getTasksByModule(
                        moduleId
                )
        );
    }


    // ==========================================
    // GET TASK
    // ==========================================

    @GetMapping("/tasks/{taskId}")
    public ResponseEntity<MvpTaskResponse> getTask(
            @PathVariable Long taskId
    ) {

        return ResponseEntity.ok(
                mvpTaskService.getTask(
                        taskId
                )
        );
    }


    // ==========================================
    // UPDATE TASK
    // ==========================================

    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<MvpTaskResponse> updateTask(
            @PathVariable Long taskId,
            @RequestBody UpdateMvpTaskRequest request
    ) {

        return ResponseEntity.ok(
                mvpTaskService.updateTask(
                        taskId,
                        request
                )
        );
    }


    // ==========================================
    // DELETE TASK
    // ==========================================

    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<String> deleteTask(
            @PathVariable Long taskId
    ) {

        mvpTaskService.deleteTask(
                taskId
        );

        return ResponseEntity.ok(
                "Task deleted successfully"
        );
    }
}