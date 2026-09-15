package com.braintrain.mvp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "judge_profiles")
@Getter
@Setter
@NoArgsConstructor
public class JudgeProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Professional Information
     */
    private String designation;

    private String organizationName;

    private String expertiseDomain;

    private Integer yearsOfExperience;

    /*
     * Professional Profiles
     */
    private String linkedinProfile;

    private String portfolioWebsite;

    /*
     * Uploaded Documents
     */
    private String resumeUrl;

    private String identityVerificationUrl;

    /*
     * Judge Status
     */
    private Boolean verified;

    private Boolean active;

    /*
     * Linked User Account
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true
    )
    private User user;
}
