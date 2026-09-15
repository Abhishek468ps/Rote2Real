package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.dto.response.MvpSkillResponse;
import com.braintrain.mvp.dto.response.MvpTechnologyResponse;
import com.braintrain.mvp.entity.Mvp;
import com.braintrain.mvp.entity.MvpSkill;
import com.braintrain.mvp.entity.MvpTechnology;
import com.braintrain.mvp.entity.Skill;
import com.braintrain.mvp.entity.Technology;
import com.braintrain.mvp.repository.MvpRepository;
import com.braintrain.mvp.repository.MvpSkillRepository;
import com.braintrain.mvp.repository.MvpTechnologyRepository;
import com.braintrain.mvp.repository.SkillRepository;
import com.braintrain.mvp.repository.TechnologyRepository;
import com.braintrain.mvp.service.MvpMappingService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MvpMappingServiceImpl
        implements MvpMappingService {

    private final MvpRepository mvpRepository;

    private final SkillRepository skillRepository;

    private final TechnologyRepository technologyRepository;

    private final MvpSkillRepository mvpSkillRepository;

    private final MvpTechnologyRepository mvpTechnologyRepository;

    @Override
    @Transactional(readOnly = true)
    public List<MvpSkillResponse> getSkills(
            Long mvpId
    ) {

        ensureMvpExists(mvpId);

        return mvpSkillRepository
                .findByMvpId(mvpId)
                .stream()
                .map(mapping ->
                        MvpSkillResponse.builder()
                                .id(mapping.getId())
                                .mvpId(mvpId)
                                .skillId(
                                        mapping.getSkill().getId()
                                )
                                .skillCode(
                                        mapping.getSkill().getCode()
                                )
                                .skillName(
                                        mapping.getSkill().getName()
                                )
                                .category(
                                        mapping.getSkill().getCategory()
                                )
                                .build()
                )
                .toList();
    }

    @Override
    public MvpSkillResponse addSkill(
            Long mvpId,
            Long skillId
    ) {

        Mvp mvp = mvpRepository.findById(mvpId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "MVP not found with id: " + mvpId
                        )
                );

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Skill not found with id: " + skillId
                        )
                );

        if (mvpSkillRepository
                .existsByMvpIdAndSkillId(mvpId, skillId)) {

            throw new RuntimeException(
                    "Skill is already mapped to this MVP"
            );
        }

        MvpSkill mapping = MvpSkill.builder()
                .mvp(mvp)
                .skill(skill)
                .build();

        mapping = mvpSkillRepository.save(mapping);

        return MvpSkillResponse.builder()
                .id(mapping.getId())
                .mvpId(mvpId)
                .skillId(skill.getId())
                .skillCode(skill.getCode())
                .skillName(skill.getName())
                .category(skill.getCategory())
                .build();
    }

    @Override
    public void removeSkill(
            Long mvpId,
            Long skillId
    ) {

        ensureMvpExists(mvpId);

        if (!mvpSkillRepository
                .existsByMvpIdAndSkillId(mvpId, skillId)) {

            throw new RuntimeException(
                    "Skill is not mapped to this MVP"
            );
        }

        mvpSkillRepository
                .deleteByMvpIdAndSkillId(
                        mvpId,
                        skillId
                );
    }

    @Override
    @Transactional(readOnly = true)
    public List<MvpTechnologyResponse> getTechnologies(
            Long mvpId
    ) {

        ensureMvpExists(mvpId);

        return mvpTechnologyRepository
                .findByMvpId(mvpId)
                .stream()
                .map(mapping ->
                        MvpTechnologyResponse.builder()
                                .id(mapping.getId())
                                .mvpId(mvpId)
                                .technologyId(
                                        mapping.getTechnology().getId()
                                )
                                .technologyCode(
                                        mapping.getTechnology()
                                                .getCode()
                                )
                                .technologyName(
                                        mapping.getTechnology()
                                                .getName()
                                )
                                .category(
                                        mapping.getTechnology()
                                                .getCategory()
                                )
                                .build()
                )
                .toList();
    }

    @Override
    public MvpTechnologyResponse addTechnology(
            Long mvpId,
            Long technologyId
    ) {

        Mvp mvp = mvpRepository.findById(mvpId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "MVP not found with id: " + mvpId
                        )
                );

        Technology technology =
                technologyRepository.findById(technologyId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Technology not found with id: "
                                                + technologyId
                                )
                        );

        if (mvpTechnologyRepository
                .existsByMvpIdAndTechnologyId(
                        mvpId,
                        technologyId
                )) {

            throw new RuntimeException(
                    "Technology is already mapped to this MVP"
            );
        }

        MvpTechnology mapping =
                MvpTechnology.builder()
                        .mvp(mvp)
                        .technology(technology)
                        .build();

        mapping =
                mvpTechnologyRepository.save(mapping);

        return MvpTechnologyResponse.builder()
                .id(mapping.getId())
                .mvpId(mvpId)
                .technologyId(technology.getId())
                .technologyCode(technology.getCode())
                .technologyName(technology.getName())
                .category(technology.getCategory())
                .build();
    }

    @Override
    public void removeTechnology(
            Long mvpId,
            Long technologyId
    ) {

        ensureMvpExists(mvpId);

        if (!mvpTechnologyRepository
                .existsByMvpIdAndTechnologyId(
                        mvpId,
                        technologyId
                )) {

            throw new RuntimeException(
                    "Technology is not mapped to this MVP"
            );
        }

        mvpTechnologyRepository
                .deleteByMvpIdAndTechnologyId(
                        mvpId,
                        technologyId
                );
    }

    private void ensureMvpExists(Long mvpId) {

        if (!mvpRepository.existsById(mvpId)) {
            throw new RuntimeException(
                    "MVP not found with id: " + mvpId
            );
        }
    }
}