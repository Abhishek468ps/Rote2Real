package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.request.RegisterRequest;
import com.braintrain.mvp.entity.*;
import com.braintrain.mvp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RegistrationService {
private final UserRepository userRepository;

private final StudentProfileRepository studentRepository;
private final MentorProfileRepository mentorRepository;
private final TrainerProfileRepository trainerRepository;
private final RecruiterProfileRepository recruiterRepository;
private final DoctorProfileRepository doctorRepository;
private final LawyerProfileRepository lawyerRepository;
private final InstitutionProfileRepository institutionRepository;
private final CompanyProfileRepository companyRepository;
private final JudgeProfileRepository judgeRepository;
private final ViewerProfileRepository viewerRepository;

    @Transactional
    public void register(RegisterRequest request) {

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setRole(request.getRole());

        userRepository.save(user);

       switch (request.getRole()) {

    case STUDENT ->
            registerStudent(user, request);

    case MENTOR ->
            registerMentor(user, request);

    case TRAINER ->
            registerTrainer(user, request);

    case RECRUITER ->
            registerRecruiter(user, request);

    case DOCTOR ->
            registerDoctor(user, request);

    case LAWYER ->
            registerLawyer(user, request);

    case INSTITUTION ->
            registerInstitution(user, request);

    case COMPANY ->
            registerCompany(user, request);

    case JUDGE ->
            registerJudge(user, request);

    case VIEWER ->
            registerViewer(user, request);
}
    }

    private void registerStudent(
            User user,
            RegisterRequest request
    ) {

        StudentProfile profile =
                new StudentProfile();

        profile.setCollege(
            getString(request, "college")
    );

    profile.setDegree(
            getString(request, "degree")
    );

    profile.setDepartment(
            getString(request, "department")
    );

    profile.setGraduationYear(
            getInteger(request, "graduationYear")
    );


        profile.setUser(user);

        studentRepository.save(profile);
    }
    
   // ==========================================
    // MENTOR HELPER METHODS
    // ==========================================

    private String getString(
            RegisterRequest request,
            String field
    ) {
        Object value =
                request.getProfile().get(field);

        return value != null
                ? value.toString()
                : null;
    }


    private String getListAsString(
            RegisterRequest request,
            String field
    ) {
        Object value =
                request.getProfile().get(field);

        return value != null
                ? value.toString()
                : null;
    }

    private Integer getInteger(
        RegisterRequest request,
        String field
) {
    Object value =
            request.getProfile().get(field);

    if (value == null) {
        return null;
    }

    if (value instanceof Number) {
        return ((Number) value).intValue();
    }

    try {
        return Integer.parseInt(
                value.toString()
        );
    } catch (NumberFormatException e) {
        return null;
    }
}


private boolean getBoolean(
        RegisterRequest request,
        String field
) {
    Object value =
            request.getProfile().get(field);

    if (value == null) {
        return false;
    }

    if (value instanceof Boolean) {
        return (Boolean) value;
    }

    return Boolean.parseBoolean(
            value.toString()
    );
}
      // ==========================================
    // MENTOR REGISTRATION
    // ==========================================

    private void registerMentor(
        User user,
        RegisterRequest request
) {

    MentorProfile profile =
            new MentorProfile();

    // ==========================================
    // PROFESSIONAL PROFILE
    // ==========================================

    profile.setOrganizationName(
            getString(
                    request,
                    "organizationName"
            )
    );

    profile.setDesignation(
            getString(
                    request,
                    "designation"
            )
    );

    profile.setExpertiseDomain(
            getString(
                    request,
                    "expertiseDomain"
            )
    );

    profile.setYearsOfExperience(
            getInteger(
                    request,
                    "yearsOfExperience"
            )
    );

    profile.setLinkedinProfile(
            getString(
                    request,
                    "linkedinProfile"
            )
    );

    profile.setGithubProfile(
            getString(
                    request,
                    "githubProfile"
            )
    );

    profile.setPortfolioWebsite(
            getString(
                    request,
                    "portfolioWebsite"
            )
    );

    // ==========================================
    // MENTOR SKILLS & CAPABILITIES
    // ==========================================

    profile.setSkills(
            getListAsString(
                    request,
                    "skills"
            )
    );

    profile.setMentoringCapabilities(
            getListAsString(
                    request,
                    "mentoringCapabilities"
            )
    );

    // ==========================================
    // MENTORING CAPACITY
    // ==========================================

    profile.setMentoringHoursPerWeek(
            getString(
                    request,
                    "mentoringHoursPerWeek"
            )
    );

    profile.setMaximumStudents(
            getString(
                    request,
                    "maximumStudents"
            )
    );

    profile.setMentoringMode(
            getString(
                    request,
                    "mentoringMode"
            )
    );

    // ==========================================
    // STUDENT PREFERENCES
    // ==========================================

    profile.setPreferredStudentLevels(
            getListAsString(
                    request,
                    "preferredStudentLevels"
            )
    );

    profile.setMvpTypes(
            getListAsString(
                    request,
                    "mvpTypes"
            )
    );

    // ==========================================
    // AVAILABILITY
    // ==========================================

    profile.setAvailabilityDays(
            getListAsString(
                    request,
                    "availabilityDays"
            )
    );

    profile.setAvailabilityTime(
            getString(
                    request,
                    "availabilityTime"
            )
    );

    // ==========================================
    // CONTRIBUTION PREFERENCES
    // ==========================================

    profile.setContributionTypes(
            getListAsString(
                    request,
                    "contributionTypes"
            )
    );

    profile.setSponsorshipType(
            getString(
                    request,
                    "sponsorshipType"
            )
    );

    // ==========================================
    // CAPABILITIES
    // ==========================================

    profile.setCanReviewProjects(
            getBoolean(
                    request,
                    "canReviewProjects"
            )
    );

    profile.setCanDemonstrateProjects(
            getBoolean(
                    request,
                    "canDemonstrateProjects"
            )
    );

    profile.setCanProvideIndustryProblem(
            getBoolean(
                    request,
                    "canProvideIndustryProblem"
            )
    );

    profile.setCanProvideNetworking(
            getBoolean(
                    request,
                    "canProvideNetworking"
            )
    );

    // ==========================================
    // RESUME
    // ==========================================

    profile.setResumeUrl(
            getString(
                    request,
                    "resumeUrl"
            )
    );

    // ==========================================
    // USER RELATION
    // ==========================================

    profile.setUser(user);

    // ==========================================
    // SAVE MENTOR PROFILE
    // ==========================================

    mentorRepository.save(profile);
}

    private void registerRecruiter(
            User user,
            RegisterRequest request
    ) {

        RecruiterProfile profile =
                new RecruiterProfile();

       profile.setCompanyName(
        getString(
                request,
                "companyName"
        )
);

           profile.setDesignation(
            getString(
                    request,
                    "designation"
            )
    );

    profile.setHiringDomains(
            getString(
                    request,
                    "hiringDomains"
            )
    );

        profile.setUser(user);

        recruiterRepository.save(profile);
    }

    private void registerTrainer(
        User user,
        RegisterRequest request
) {
    TrainerProfile profile =
            new TrainerProfile();

   profile.setExpertiseDomains(
        getString(
                request,
                "expertiseDomains"
        )
);

   profile.setYearsOfExperience(
        getInteger(
                request,
                "yearsOfExperience"
        )
);

   profile.setTrainingExperience(
        getString(
                request,
                "trainingExperience"
        )
);

    profile.setUser(user);

    trainerRepository.save(profile);
}

private void registerDoctor(
        User user,
        RegisterRequest request
) {

    DoctorProfile profile =
            new DoctorProfile();

     profile.setSpecialization(
            getString(
                    request,
                    "specialization"
            )
    );

    profile.setHospitalName(
            getString(
                    request,
                    "hospitalName"
            )
    );

    profile.setMedicalCouncilRegistrationNumber(
            getString(
                    request,
                    "medicalCouncilRegistrationNumber"
            )
    );

    profile.setUser(user);

    doctorRepository.save(profile);
}

private void registerLawyer(
        User user,
        RegisterRequest request
) {

    LawyerProfile profile =
            new LawyerProfile();


    profile.setLawFirmName(
            getString(
                    request,
                    "lawFirmName"
            )
    );

    profile.setBarCouncilRegistrationNumber(
            getString(
                    request,
                    "barCouncilRegistrationNumber"
            )
    );

    profile.setUser(user);

    lawyerRepository.save(profile);
}
private void registerInstitution(
        User user,
        RegisterRequest request
) {

    InstitutionProfile profile =
            new InstitutionProfile();

   profile.setInstitutionName(
            getString(
                    request,
                    "institutionName"
            )
    );

    profile.setInstitutionType(
            getString(
                    request,
                    "institutionType"
            )
    );

    profile.setWebsite(
            getString(
                    request,
                    "website"
            )
    );

    profile.setUser(user);

    institutionRepository.save(profile);
}
private void registerCompany(
        User user,
        RegisterRequest request
) {

    CompanyProfile profile =
            new CompanyProfile();

  
    profile.setCompanyName(
            getString(
                    request,
                    "companyName"
            )
    );

    profile.setIndustryType(
            getString(
                    request,
                    "industryType"
            )
    );

    profile.setWebsite(
            getString(
                    request,
                    "website"
            )
    );

    profile.setUser(user);

    companyRepository.save(profile);
}
private void registerJudge(
        User user,
        RegisterRequest request
) {

    JudgeProfile profile =
            new JudgeProfile();

  
    profile.setOrganizationName(
            getString(
                    request,
                    "organizationName"
            )
    );

    profile.setDesignation(
            getString(
                    request,
                    "designation"
            )
    );

    profile.setExpertiseDomain(
            getString(
                    request,
                    "expertiseDomain"
            )
    );

    profile.setUser(user);

    judgeRepository.save(profile);
}
private void registerViewer(
        User user,
        RegisterRequest request
) {

    ViewerProfile profile =
            new ViewerProfile();

    profile.setOrganizationName(
            getString(
                    request,
                    "organizationName"
            )
    );

    profile.setDesignation(
            getString(
                    request,
                    "designation"
            )
    );

    profile.setPurposeOfJoining(
            getString(
                    request,
                    "purposeOfJoining"
            )
    );

    profile.setUser(user);

    viewerRepository.save(profile);
}
}
