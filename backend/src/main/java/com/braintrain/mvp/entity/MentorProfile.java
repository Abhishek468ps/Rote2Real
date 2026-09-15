package com.braintrain.mvp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "mentor_profiles")
@Getter
@Setter
@NoArgsConstructor
public class MentorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String expertiseDomain;

    private Integer yearsOfExperience;

    private String organizationName;

    private String designation;

    private String linkedinProfile;

    private String githubProfile;

    private String portfolioWebsite;

    private String resumeUrl;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true
    )
    private User user;
}
