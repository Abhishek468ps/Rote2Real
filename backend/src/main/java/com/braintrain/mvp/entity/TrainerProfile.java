package com.braintrain.mvp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "trainer_profiles")
@Getter
@Setter
@NoArgsConstructor
public class TrainerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String expertiseDomains;

    private Integer yearsOfExperience;

    private String trainingExperience;

    private String linkedinProfile;

    private String githubProfile;

    private String portfolioWebsite;

    private String resumeUrl;

    private String certificationsUrl;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
