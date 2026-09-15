package com.braintrain.mvp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student_profiles")
@Getter
@Setter
@NoArgsConstructor
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String college;

    private String degree;

    private String department;

    private Integer graduationYear;

    private String skills;

    private String resumeUrl;

     @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mvp_domain_id")
    private MvpDomain mvpDomain;
    
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
