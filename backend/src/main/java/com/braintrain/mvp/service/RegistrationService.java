package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.request.RegisterRequest;
import com.braintrain.mvp.entity.*;
import com.braintrain.mvp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
                (String) request.getProfile()
                        .get("college")
        );

        profile.setDegree(
                (String) request.getProfile()
                        .get("degree")
        );

        profile.setDepartment(
                (String) request.getProfile()
                        .get("department")
        );

        profile.setGraduationYear(
                (Integer) request.getProfile()
                        .get("graduationYear")
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
      // ==========================================
    // MENTOR REGISTRATION
    // ==========================================

    private void registerMentor(
            User user,
            RegisterRequest request
    ) {

        MentorProfile profile =
                new MentorProfile();

        profile.setOrganizationName(
                (String) request.getProfile()
                        .get("organizationName")
        );

        profile.setDesignation(
                (String) request.getProfile()
                        .get("designation")
        );

        profile.setExpertiseDomain(
                (String) request.getProfile()
                        .get("expertiseDomain")
        );

        profile.setUser(user);

        mentorRepository.save(profile);
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

        recruiterRepository.save(profile);
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

    trainerRepository.save(profile);
}

private void registerDoctor(
        User user,
        RegisterRequest request
) {

    DoctorProfile profile =
            new DoctorProfile();

    profile.setSpecialization(
            (String) request.getProfile()
                    .get("specialization")
    );

    profile.setHospitalName(
            (String) request.getProfile()
                    .get("hospitalName")
    );

    profile.setMedicalCouncilRegistrationNumber(
            (String) request.getProfile()
                    .get("medicalCouncilRegistrationNumber")
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
            (String) request.getProfile()
                    .get("lawFirmName")
    );

    profile.setBarCouncilRegistrationNumber(
            (String) request.getProfile()
                    .get("barCouncilRegistrationNumber")
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

    institutionRepository.save(profile);
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

    companyRepository.save(profile);
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

    profile.setDesignation(
            (String) request.getProfile()
                    .get("designation")
    );

    profile.setExpertiseDomain(
            (String) request.getProfile()
                    .get("expertiseDomain")
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
            (String) request.getProfile()
                    .get("organizationName")
    );

    profile.setDesignation(
            (String) request.getProfile()
                    .get("designation")
    );

    profile.setPurposeOfJoining(
            (String) request.getProfile()
                    .get("purposeOfJoining")
    );

    profile.setUser(user);

    viewerRepository.save(profile);
}
}
