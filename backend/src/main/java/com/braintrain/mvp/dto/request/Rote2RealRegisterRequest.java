package com.braintrain.mvp.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rote2RealRegisterRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 150, message = "Name must not exceed 150 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Valid email is required")
    @Size(max = 150, message = "Email must not exceed 150 characters")
    private String email;

    @NotBlank(message = "Phone is required")
    @Size(max = 20, message = "Phone must not exceed 20 characters")
    private String phone;

    @NotBlank(message = "Country is required")
    @Size(max = 80, message = "Country must not exceed 80 characters")
    private String country;

    @NotBlank(message = "University or college name is required")
    @Size(max = 200, message = "University or college name must not exceed 200 characters")
    private String universityName;

    @NotBlank(message = "Course or degree is required")
    @Size(max = 200, message = "Course or degree must not exceed 200 characters")
    private String courseDegree;

    @NotBlank(message = "Year of study is required")
    @Size(max = 50, message = "Year of study must not exceed 50 characters")
    private String yearOfStudy;

    @NotBlank(message = "Track is required")
    @Size(max = 100, message = "Track must not exceed 100 characters")
    private String track;
}
