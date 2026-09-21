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

     // ==========================
    // MENTOR SKILLS
    // ==========================

    @Column(columnDefinition = "TEXT")
    private String skills;

    @Column(columnDefinition = "TEXT")
    private String mentoringCapabilities;

      // ==========================
    // MENTORING CAPACITY
    // ==========================

    private String mentoringHoursPerWeek;

    private String maximumStudents;

    private String mentoringMode;


    // ==========================
    // STUDENT PREFERENCES
    // ==========================

    @Column(columnDefinition = "TEXT")
    private String preferredStudentLevels;

    @Column(columnDefinition = "TEXT")
    private String mvpTypes;

    // ==========================
    // AVAILABILITY
    // ==========================

    @Column(columnDefinition = "TEXT")
    private String availabilityDays;

    private String availabilityTime;


    // ==========================
    // CONTRIBUTION
    // ==========================

    @Column(columnDefinition = "TEXT")
    private String contributionTypes;

    private String sponsorshipType;

    // ==========================
    // CAPABILITIES
    // ==========================

    private boolean canReviewProjects;

    private boolean canDemonstrateProjects;

    private boolean canProvideIndustryProblem;

    private boolean canProvideNetworking;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true
    )
    private User user;
}
