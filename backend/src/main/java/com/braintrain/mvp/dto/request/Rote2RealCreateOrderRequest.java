package com.braintrain.mvp.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rote2RealCreateOrderRequest {

    @NotNull(message = "Student ID is required")
    private Long studentId;
}
