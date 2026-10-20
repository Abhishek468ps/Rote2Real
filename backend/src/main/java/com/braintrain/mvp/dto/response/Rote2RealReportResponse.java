package com.braintrain.mvp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rote2RealReportResponse {

    private Long studentId;
    private String studentName;
    private String studentEmail;
    private String country;
    private Boolean isInternational;
    
    // Overall Stats
    private int totalExercises;
    private int completedExercises;
    private BigDecimal completionPercentage;
    
    // Evaluation Metrics
    private BigDecimal evidenceScore;
    private BigDecimal consistencyPercentage;
    private BigDecimal finalScore;
    
    // Achievement Level: GOLD, SILVER, BRONZE, INCOMPLETE
    private String achievementLevel;
    private LocalDateTime evaluatedAt;

    // Skills & Areas breakdown
    private Map<String, SkillAreaBreakdown> skillAreas;

    // Detailed Exercise Results
    private List<Rote2RealSubmissionResponse> exerciseResults;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SkillAreaBreakdown {
        private String category;
        private int total;
        private int completed;
        private BigDecimal completionRate;
        private BigDecimal averageScore;
    }
}
