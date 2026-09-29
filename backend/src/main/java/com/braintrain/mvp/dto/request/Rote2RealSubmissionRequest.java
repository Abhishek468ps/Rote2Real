package com.braintrain.mvp.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rote2RealSubmissionRequest {

    @NotNull(message = "Exercise ID is required")
    private Long exerciseId;

    private String evidenceText;

    @Size(max = 500, message = "Evidence URL must not exceed 500 characters")
    private String evidenceUrl;

    @Size(max = 500, message = "Evidence file path must not exceed 500 characters")
    private String evidenceFilePath;

    @Min(value = 0, message = "Quality score cannot be less than 0")
    @Max(value = 10, message = "Quality score cannot be greater than 10")
    private Integer qualityScore;
}
