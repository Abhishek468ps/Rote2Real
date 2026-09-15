
package com.braintrain.mvp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "institution_profiles")
@Getter
@Setter
@NoArgsConstructor
public class InstitutionProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Institution Information
     */
    private String institutionName;

    private String institutionType;

    private String affiliation;

    private String accreditation;

    private String website;

    private String headquartersLocation;

    /*
     * Contact Information
     */
    private String contactPersonName;

    private String designation;

    private String linkedinProfile;

    /*
     * Institution Statistics
     */
    private Integer totalStudents;

    private Integer totalFaculty;

    private Integer establishedYear;

    /*
     * Uploaded Documents
     */
    private String institutionLogoUrl;

    private String accreditationCertificateUrl;

    private String registrationCertificateUrl;

    /*
     * Additional Information
     */
    private String description;

    private String industryCollaborationDetails;

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