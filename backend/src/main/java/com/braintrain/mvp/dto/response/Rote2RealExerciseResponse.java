package com.braintrain.mvp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rote2RealExerciseResponse {

    private Long id;
    private Integer dayNumber;
    private String title;
    private String description;
    private String category;
    private Boolean requiresEvidence;
    private String evidenceType;
    private Integer orderIndex;
    private Boolean isActive;
    
    // Status relative to a querying student if student context is provided
    private String submissionStatus; // e.g. COMPLETED or PENDING or NOT_SUBMITTED
    private String evidenceText;
    private String evidenceUrl;
    private String evidenceFilePath;
    private Integer qualityScore;
}
