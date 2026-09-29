package com.braintrain.mvp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rote2RealSubmissionResponse {

    private Long id;
    private Long studentId;
    private Long exerciseId;
    private Integer dayNumber;
    private String exerciseTitle;
    private String category;
    private String status;
    private String evidenceText;
    private String evidenceUrl;
    private String evidenceFilePath;
    private Integer qualityScore;
    private LocalDateTime submittedAt;
}
