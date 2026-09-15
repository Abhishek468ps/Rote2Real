package com.braintrain.mvp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "viewer_profiles")
@Getter
@Setter
@NoArgsConstructor
public class ViewerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Viewer Information
     */
    private String organizationName;

    private String designation;

    private String purposeOfJoining;

    /*
     * Professional Profiles
     */
    private String linkedinProfile;

    private String portfolioWebsite;

    /*
     * Uploaded Documents
     */
    private String identityVerificationUrl;

    /*
     * Viewer Status
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
