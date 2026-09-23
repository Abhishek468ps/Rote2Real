package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.dto.request.RegisterRequest;
import com.braintrain.mvp.dto.response.RegistrationResponse;
import com.braintrain.mvp.entity.CompanyProfile;
import com.braintrain.mvp.entity.DoctorProfile;
import com.braintrain.mvp.entity.InstitutionProfile;
import com.braintrain.mvp.entity.JudgeProfile;
import com.braintrain.mvp.entity.LawyerProfile;
import com.braintrain.mvp.entity.MentorProfile;
import com.braintrain.mvp.entity.MvpDomain;
import com.braintrain.mvp.entity.RecruiterProfile;
import com.braintrain.mvp.entity.StudentProfile;
import com.braintrain.mvp.entity.TrainerProfile;
import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.entity.ViewerProfile;
import com.braintrain.mvp.service.RegistrationService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.braintrain.mvp.repository.*;
import com.braintrain.mvp.entity.EmailOtp;
import com.braintrain.mvp.utils.BrainTrainIdGenerator;
import com.braintrain.mvp.service.EmailService;
@Service
@RequiredArgsConstructor
public class RegistrationServiceImpl
        implements RegistrationService {

    private final UserRepository userRepository;
     private final EmailOtpRepository otpRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final MvpDomainRepository mvpDomainRepository;
    private final MentorProfileRepository mentorProfileRepository;
    private final TrainerProfileRepository trainerProfileRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final DoctorProfileRepository doctorProfileRepository;
    private final LawyerProfileRepository lawyerProfileRepository;
    private final InstitutionProfileRepository institutionProfileRepository;
    private final CompanyProfileRepository companyProfileRepository;
    private final JudgeProfileRepository judgeProfileRepository;
    private final ViewerProfileRepository viewerProfileRepository;
    private final BrainTrainIdGenerator brainTrainIdGenerator;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Override
                @Transactional
    public RegistrationResponse register(
            RegisterRequest request
    ) {

        if (
        userRepository
                .findByEmail(
                        request.getEmail()
                )
                .isPresent()
) {
    throw new RuntimeException(
            "Email already registered"
    );
}
        EmailOtp emailOtp =
        otpRepository
                .findTopByEmailOrderByIdDesc(
                        request.getEmail()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "OTP not found"
                        )
                );

if (
        !emailOtp.getVerified()
) {
    throw new RuntimeException(
            "Email not verified"
    );
}

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(
        passwordEncoder.encode(
                request.getPassword()
        )
);

        user.setRole(request.getRole());
       user.setBraintrainId(
        brainTrainIdGenerator
                .generate(
                        request.getRole()
                )
);
        user.setActive(true);
        user.setEmailVerified(true);

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

        emailService.sendWelcomeEmail(user);

        return new RegistrationResponse(
                user.getId(),
                user.getBraintrainId(),
                user.getRole().name(),
                "Registration Successful"
        );
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


profile.setSkills(
        getString(request, "skills")
);

profile.setResumeUrl(
        getString(request, "resumeUrl")
);

// ==============================
    // MVP DOMAIN
    // ==============================

    Object domainIdObject =
            request.getProfile()
                    .get("mvpDomainId");

    if (domainIdObject == null) {
        throw new RuntimeException(
                "MVP domain is required"
        );
    }

   Long domainId;

if (domainIdObject instanceof Number) {
    domainId = ((Number) domainIdObject).longValue();
} else {
    try {
        domainId = Long.parseLong(
                domainIdObject.toString()
        );
    } catch (NumberFormatException e) {
        throw new RuntimeException(
                "Invalid MVP domain ID"
        );
    }
}
    MvpDomain domain =
            mvpDomainRepository
                    .findById(domainId)
                    .orElseThrow(
                            () -> new RuntimeException(
                                    "MVP domain not found"
                            )
                    );

    profile.setMvpDomain(domain);

        profile.setUser(user);

        studentProfileRepository.save(profile);
    }

    private String getString(
        RegisterRequest request,
        String field
) {
    Object value = request.getProfile().get(field);

    return value != null
            ? value.toString()
            : null;
} 

                private String getListAsString(
        RegisterRequest request,
        String field
) {
    Object value = request.getProfile().get(field);

    return value != null
            ? value.toString()
            : null;
}

                private Integer getInteger(
        RegisterRequest request,
        String field
) {
    Object value = request.getProfile().get(field);

    if (value == null) {
        return null;
    }

    if (value instanceof Number) {
        return ((Number) value).intValue();
    }

    try {
        return Integer.parseInt(value.toString());
    } catch (NumberFormatException e) {
        return null;
    }
}

    private boolean getBoolean(
        RegisterRequest request,
        String field
) {
    Object value = request.getProfile().get(field);

    if (value == null) {
        return false;
    }

    if (value instanceof Boolean) {
        return (Boolean) value;
    }

    return Boolean.parseBoolean(value.toString());
}            

private void registerMentor(
        User user,
        RegisterRequest request
) {

    MentorProfile profile = new MentorProfile();

    // ==========================================
    // PROFESSIONAL PROFILE
    // ==========================================

    profile.setOrganizationName(
            getString(request, "organizationName")
    );

    profile.setDesignation(
            getString(request, "designation")
    );

    profile.setExpertiseDomain(
            getString(request, "expertiseDomain")
    );

    profile.setYearsOfExperience(
            getInteger(request, "yearsOfExperience")
    );

    profile.setLinkedinProfile(
            getString(request, "linkedinProfile")
    );

    profile.setGithubProfile(
            getString(request, "githubProfile")
    );

    profile.setPortfolioWebsite(
            getString(request, "portfolioWebsite")
    );

    // ==========================================
    // SKILLS & MENTORING CAPABILITIES
    // ==========================================

    profile.setSkills(
            getListAsString(request, "skills")
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
    // CONTRIBUTION
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
    // ADDITIONAL CAPABILITIES
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
            getString(request, "resumeUrl")
    );

    // ==========================================
    // USER RELATION
    // ==========================================

    profile.setUser(user);

    mentorProfileRepository.save(profile);
}

    private void registerTrainer(
            User user,
            RegisterRequest request
    ) {

        TrainerProfile profile =
                new TrainerProfile();

        profile.setExpertiseDomains(
                (String) request.getProfile()
                        .get("expertiseDomains")
        );

        profile.setYearsOfExperience(
                (Integer) request.getProfile()
                        .get("yearsOfExperience")
        );

        profile.setTrainingExperience(
                (String) request.getProfile()
                        .get("trainingExperience")
        );

        profile.setUser(user);

        trainerProfileRepository.save(profile);
    }

    private void registerRecruiter(
            User user,
            RegisterRequest request
    ) {

        RecruiterProfile profile =
                new RecruiterProfile();

        profile.setCompanyName(
                (String) request.getProfile()
                        .get("companyName")
        );

        profile.setDesignation(
                (String) request.getProfile()
                        .get("designation")
        );

        profile.setHiringDomains(
                (String) request.getProfile()
                        .get("hiringDomains")
        );

        profile.setUser(user);

        recruiterProfileRepository.save(profile);
    }

    private void registerDoctor(
            User user,
            RegisterRequest request
    ) {

        DoctorProfile profile =
                new DoctorProfile();

        profile.setHospitalName(
                (String) request.getProfile()
                        .get("hospitalName")
        );

        profile.setSpecialization(
                (String) request.getProfile()
                        .get("specialization")
        );

       profile.setYearsOfExperience(
        getInteger(
                request,
                "yearsOfExperience"
        )
);

        profile.setUser(user);

        doctorProfileRepository.save(profile);
    }

    private void registerLawyer(
            User user,
            RegisterRequest request
    ) {

        LawyerProfile profile =
                new LawyerProfile();

        profile.setLawFirmName(
                (String) request.getProfile()
                        .get("lawFirmName")
        );

        

        profile.setYearsOfExperience(
        getInteger(
                request,
                "yearsOfExperience"
        )
);

        profile.setUser(user);

        lawyerProfileRepository.save(profile);
    }

    private void registerInstitution(
            User user,
            RegisterRequest request
    ) {

        InstitutionProfile profile =
                new InstitutionProfile();

        profile.setInstitutionName(
                (String) request.getProfile()
                        .get("institutionName")
        );

        profile.setInstitutionType(
                (String) request.getProfile()
                        .get("institutionType")
        );

        profile.setWebsite(
                (String) request.getProfile()
                        .get("website")
        );

        profile.setUser(user);

        institutionProfileRepository.save(profile);
    }

    private void registerCompany(
            User user,
            RegisterRequest request
    ) {

        CompanyProfile profile =
                new CompanyProfile();

        profile.setCompanyName(
                (String) request.getProfile()
                        .get("companyName")
        );

        profile.setIndustryType(
                (String) request.getProfile()
                        .get("industryType")
        );

        profile.setWebsite(
                (String) request.getProfile()
                        .get("website")
        );

        profile.setUser(user);

        companyProfileRepository.save(profile);
    }

    private void registerJudge(
            User user,
            RegisterRequest request
    ) {

        JudgeProfile profile =
                new JudgeProfile();

        profile.setOrganizationName(
                (String) request.getProfile()
                        .get("organizationName")
        );

        profile.setExpertiseDomain(
                (String) request.getProfile()
                        .get("expertiseDomain")
        );

        profile.setYearsOfExperience(
        getInteger(
                request,
                "yearsOfExperience"
        )
);

        profile.setUser(user);

        judgeProfileRepository.save(profile);
    }

    private void registerViewer(
            User user,
            RegisterRequest request
    ) {

        ViewerProfile profile =
                new ViewerProfile();

        profile.setOrganizationName(
                (String) request.getProfile()
                        .get("organizationName")
        );

        profile.setPurposeOfJoining(
                (String) request.getProfile()
                        .get("purposeOfJoining")
        );

        profile.setUser(user);

        viewerProfileRepository.save(profile);
    }
}
