package com.braintrain.mvp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "lawyer_profiles")
@Getter
@Setter
@NoArgsConstructor
public class LawyerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Professional Information
     */
    private String specialization;

    private Integer yearsOfExperience;

    private String lawFirmName;

    private String designation;

    /*
     * Registration Details
     */
    private String barCouncilRegistrationNumber;

    private String barCouncilName;

    /*
     * Professional Profiles
     */
    private String linkedinProfile;

    private String portfolioWebsite;

    /*
     * Uploaded Documents
     */
    private String resumeUrl;

    private String barLicenseUrl;

    private String identityVerificationUrl;

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
