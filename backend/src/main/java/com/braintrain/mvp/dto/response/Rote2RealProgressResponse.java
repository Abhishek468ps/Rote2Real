package com.braintrain.mvp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rote2RealProgressResponse {

    private Long studentId;
    private String studentName;
    private String studentEmail;
    private int totalExercises;
    private int completedExercises;
    private int pendingExercises;
    private BigDecimal completionPercentage;
    private Map<String, Integer> categoryProgress; // category -> completed count
    private Map<String, Integer> categoryTotals;   // category -> total count
    private List<Rote2RealSubmissionResponse> recentSubmissions;
}
