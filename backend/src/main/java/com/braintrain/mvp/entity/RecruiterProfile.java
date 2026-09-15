package com.braintrain.mvp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "recruiter_profiles")
@Getter
@Setter
@NoArgsConstructor
public class RecruiterProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Company Information
     */
    private String companyName;

    private String designation;

    private String industryType;

    /*
     * Hiring Information
     */
    private String hiringDomains;

    private Integer yearsOfExperience;

    private Integer hiringVolume;

    /*
     * Professional Profiles
     */
    private String linkedinProfile;

    private String companyWebsite;

    /*
     * Uploaded Documents
     */
    private String resumeUrl;

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
