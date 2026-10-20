package com.braintrain.mvp.utils;

import com.braintrain.mvp.enums.UserRole;
import com.braintrain.mvp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Year;

@Component
@RequiredArgsConstructor
public class BrainTrainIdGenerator {

    private final UserRepository userRepository;

    public String generate(UserRole role) {

        String prefix = getPrefix(role);

        long nextNumber =
                userRepository.countByRole(role) + 1;

        return String.format(
                "BT-%s-%d-%04d",
                prefix,
                Year.now().getValue(),
                nextNumber
        );
    }

    private String getPrefix(UserRole role) {

        return switch (role) {

            case ADMIN -> "ADM";

            case STUDENT -> "STU";

            case MENTOR -> "MEN";

            case TRAINER -> "TRN";

            case RECRUITER -> "REC";

            case COMPANY -> "COM";

            case INSTITUTION -> "INS";

            case DOCTOR -> "DOC";

            case LAWYER -> "LAW";

            case JUDGE -> "JDG";

            case VIEWER -> "VIW";
        };
    }
}
