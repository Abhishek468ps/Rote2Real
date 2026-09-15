package com.braintrain.mvp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "company_profiles")
@Getter
@Setter
@NoArgsConstructor
public class CompanyProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Company Information
     */
    private String companyName;

    private String industryType;

    private String companySize;

    private String website;

    private String headquartersLocation;

    private String gstNumber;

    /*
     * Contact Information
     */
    private String contactPersonName;

    private String designation;

    private String officialEmail;

    private String phoneNumber;

    private String linkedinProfile;

    /*
     * Company Details
     */
    private Integer establishedYear;

    private String description;

    private String hiringDomains;

    private Integer totalEmployees;

    /*
     * Uploaded Documents
     */
    private String companyLogoUrl;

    private String registrationCertificateUrl;

    private String identityVerificationUrl;

    /*
     * Account Status
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
