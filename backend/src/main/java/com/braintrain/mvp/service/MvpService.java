package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.request.CreateMvpRequest;
import com.braintrain.mvp.dto.response.MvpResponse;
import com.braintrain.mvp.entity.Mvp;
import com.braintrain.mvp.entity.MvpDomain;
import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.enums.MvpStatus;
import com.braintrain.mvp.repository.MvpDomainRepository;
import com.braintrain.mvp.repository.MvpRepository;
import com.braintrain.mvp.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MvpService {

    private final MvpRepository mvpRepository;

    private final MvpDomainRepository domainRepository;

    private final UserRepository userRepository;


    // ==========================================
    // GET ALL MVPS
    // ==========================================

    public List<MvpResponse> getAllMvps() {

        return mvpRepository
                .findAllWithDomain()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // ==========================================
    // GET MVPS BY STATUS
    // ==========================================

    public List<MvpResponse> getMvpsByStatus(
            MvpStatus status
    ) {

        return mvpRepository
                .findByStatusWithDomain(
                        status
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ==========================================
    // GET STUDENT MVPS BY DOMAIN
    // ==========================================

    public List<MvpResponse> getStudentMvpsByDomain(
            Long domainId
    ) {

        return mvpRepository
                .findByDomainIdAndStatusWithDomain(
                        domainId,
                        MvpStatus.PUBLISHED
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    // ==========================================
    // GET MVP BY ID
    // ==========================================

    public MvpResponse getMvpById(
            Long id
    ) {

        Mvp mvp =
                mvpRepository
                        .findByIdWithDomainAndOwner(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "MVP not found"
                                )
                        );

        return mapToResponse(mvp);
    }


    // ==========================================
    // CREATE MVP
    // ==========================================

    public MvpResponse createMvp(
            CreateMvpRequest request
    ) {

        if (
            mvpRepository.existsByMvpCode(
                    request.getMvpCode()
            )
        ) {
            throw new RuntimeException(
                    "MVP code already exists"
            );
        }


        if (
            mvpRepository.existsBySlug(
                    request.getSlug()
            )
        ) {
            throw new RuntimeException(
                    "MVP slug already exists"
            );
        }


        MvpDomain domain =
                domainRepository
                        .findById(
                                request.getDomainId()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "MVP domain not found"
                                )
                        );


        Mvp mvp =
                new Mvp();


        mvp.setMvpCode(
                request.getMvpCode()
                        .trim()
                        .toUpperCase()
        );


        mvp.setTitle(
                request.getTitle()
        );


        mvp.setSlug(
                request.getSlug()
                        .trim()
                        .toLowerCase()
        );


        mvp.setShortDescription(
                request.getShortDescription()
        );


        mvp.setDescription(
                request.getDescription()
        );


        mvp.setDomain(
                domain
        );


        mvp.setCategory(
                request.getCategory()
        );


        if (
            request.getDifficulty() != null
        ) {

            mvp.setDifficulty(
                    request.getDifficulty()
            );
        }


        mvp.setPrerequisites(
                request.getPrerequisites()
        );


        mvp.setLearningOutcomes(
                request.getLearningOutcomes()
        );


        mvp.setDeliverables(
                request.getDeliverables()
        );


        mvp.setEstimatedHours(
                request.getEstimatedHours()
        );


        if (
            request.getMinTeamSize() != null
        ) {

            mvp.setMinTeamSize(
                    request.getMinTeamSize()
            );
        }


        if (
            request.getMaxTeamSize() != null
        ) {

            mvp.setMaxTeamSize(
                    request.getMaxTeamSize()
            );
        }


        mvp.setTeamAllowed(
                request.isTeamAllowed()
        );


        if (
            request.getRewardXp() != null
        ) {

            mvp.setRewardXp(
                    request.getRewardXp()
            );
        }


        mvp.setCertificateEnabled(
                request.isCertificateEnabled()
        );


        mvp.setPortfolioEnabled(
                request.isPortfolioEnabled()
        );


        mvp.setMentorEnabled(
                request.isMentorEnabled()
        );


        mvp.setAiMentorEnabled(
                request.isAiMentorEnabled()
        );


        mvp.setFeatured(
                request.isFeatured()
        );


        if (
            request.getStatus() != null
        ) {

            mvp.setStatus(
                    request.getStatus()
            );
        }


        return mapToResponse(
                mvpRepository.save(mvp)
        );
    }


    // ==========================================
    // UPDATE MVP
    // ==========================================
@Transactional
    public MvpResponse updateMvp(
            Long id,
            CreateMvpRequest request
    ) {

        Mvp mvp =
                mvpRepository.findByIdWithDomain(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "MVP not found"
                                )
                        );


        MvpDomain domain =
                domainRepository
                        .findById(
                                request.getDomainId()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "MVP domain not found"
                                )
                        );


        if (
            !mvp
                .getMvpCode()
                .equalsIgnoreCase(
                        request.getMvpCode()
                )
        ) {

            if (
                mvpRepository.existsByMvpCode(
                        request.getMvpCode()
                )
            ) {

                throw new RuntimeException(
                        "MVP code already exists"
                );
            }
        }


        if (
            !mvp
                .getSlug()
                .equalsIgnoreCase(
                        request.getSlug()
                )
        ) {

            if (
                mvpRepository.existsBySlug(
                        request.getSlug()
                )
            ) {

                throw new RuntimeException(
                        "MVP slug already exists"
                );
            }
        }


        mvp.setMvpCode(
                request.getMvpCode()
                        .trim()
                        .toUpperCase()
        );


        mvp.setTitle(
                request.getTitle()
        );


        mvp.setSlug(
                request.getSlug()
                        .trim()
                        .toLowerCase()
        );


        mvp.setShortDescription(
                request.getShortDescription()
        );


        mvp.setDescription(
                request.getDescription()
        );


        mvp.setDomain(
                domain
        );


        mvp.setCategory(
                request.getCategory()
        );


        if (
            request.getDifficulty() != null
        ) {

            mvp.setDifficulty(
                    request.getDifficulty()
            );
        }


        mvp.setPrerequisites(
                request.getPrerequisites()
        );


        mvp.setLearningOutcomes(
                request.getLearningOutcomes()
        );


        mvp.setDeliverables(
                request.getDeliverables()
        );


        mvp.setEstimatedHours(
                request.getEstimatedHours()
        );


        if (
            request.getMinTeamSize() != null
        ) {

            mvp.setMinTeamSize(
                    request.getMinTeamSize()
            );
        }


        if (
            request.getMaxTeamSize() != null
        ) {

            mvp.setMaxTeamSize(
                    request.getMaxTeamSize()
            );
        }


        mvp.setTeamAllowed(
                request.isTeamAllowed()
        );


        if (
            request.getRewardXp() != null
        ) {

            mvp.setRewardXp(
                    request.getRewardXp()
            );
        }


        mvp.setCertificateEnabled(
                request.isCertificateEnabled()
        );


        mvp.setPortfolioEnabled(
                request.isPortfolioEnabled()
        );


        mvp.setMentorEnabled(
                request.isMentorEnabled()
        );


        mvp.setAiMentorEnabled(
                request.isAiMentorEnabled()
        );


        mvp.setFeatured(
                request.isFeatured()
        );


        if (
            request.getStatus() != null
        ) {

            mvp.setStatus(
                    request.getStatus()
            );
        }


        mvpRepository.save(mvp);

return mapToResponse(mvp);
    }


    // ==========================================
    // DELETE MVP
    // ==========================================

    public void deleteMvp(
            Long id
    ) {

        if (
            !mvpRepository.existsById(id)
        ) {

            throw new RuntimeException(
                    "MVP not found"
            );
        }

        mvpRepository.deleteById(id);
    }


    // ==========================================
    // ENTITY → RESPONSE
    // ==========================================

    private MvpResponse mapToResponse(
            Mvp mvp
    ) {

        MvpResponse response =
                new MvpResponse();


        response.setId(
                mvp.getId()
        );


        response.setMvpCode(
                mvp.getMvpCode()
        );


        response.setTitle(
                mvp.getTitle()
        );


        response.setSlug(
                mvp.getSlug()
        );


        response.setShortDescription(
                mvp.getShortDescription()
        );


        response.setDescription(
                mvp.getDescription()
        );


        if (
            mvp.getDomain() != null
        ) {

            MvpDomain domain =
                    mvp.getDomain();

            response.setDomain(
                    new com.braintrain.mvp.dto.response.MvpDomainResponse(

                            domain.getId(),

                            domain.getCode(),

                            domain.getName(),

                            domain.getDescription(),

                            domain.getIcon(),

                            domain.getColor(),

                            domain.isActive(),

                            domain.getDisplayOrder()
                    )
            );
        }


        response.setCategory(
                mvp.getCategory()
        );


        response.setDifficulty(
                mvp.getDifficulty()
        );


        response.setPrerequisites(
                mvp.getPrerequisites()
        );


        response.setLearningOutcomes(
                mvp.getLearningOutcomes()
        );


        response.setDeliverables(
                mvp.getDeliverables()
        );


        response.setEstimatedHours(
                mvp.getEstimatedHours()
        );


        response.setMinTeamSize(
                mvp.getMinTeamSize()
        );


        response.setMaxTeamSize(
                mvp.getMaxTeamSize()
        );


        response.setTeamAllowed(
                mvp.isTeamAllowed()
        );


        response.setRewardXp(
                mvp.getRewardXp()
        );


        response.setCertificateEnabled(
                mvp.isCertificateEnabled()
        );


        response.setPortfolioEnabled(
                mvp.isPortfolioEnabled()
        );


        response.setMentorEnabled(
                mvp.isMentorEnabled()
        );


        response.setAiMentorEnabled(
                mvp.isAiMentorEnabled()
        );


        response.setFeatured(
                mvp.isFeatured()
        );


        response.setStatus(
                mvp.getStatus()
        );


        if (
            mvp.getOwner() != null
        ) {

            response.setOwnerId(
                    mvp.getOwner().getId()
            );

            response.setOwnerName(
                    mvp.getOwner().getFullName()
            );
        }


        response.setCreatedAt(
                mvp.getCreatedAt()
        );


        response.setUpdatedAt(
                mvp.getUpdatedAt()
        );


        response.setPublishedAt(
                mvp.getPublishedAt()
        );


        response.setCompletedAt(
                mvp.getCompletedAt()
        );


        return response;
    }
}