package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.dto.request.SkillRequest;
import com.braintrain.mvp.dto.response.SkillResponse;
import com.braintrain.mvp.entity.Skill;
import com.braintrain.mvp.repository.SkillRepository;
import com.braintrain.mvp.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    @Override
      @Transactional(readOnly = true)
    public List<SkillResponse> getAll() {

        return skillRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

     @Override
    @Transactional(readOnly = true)
    public List<SkillResponse> getActive() {

        return skillRepository
                .findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public SkillResponse getById(Long id) {

        Skill skill = skillRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Skill not found with id: " + id
                        )
                );

        return mapToResponse(skill);
    }

    @Override
    public SkillResponse create(SkillRequest request) {

        if (request.getCode() == null ||
                request.getCode().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Skill code is required"
            );
        }

        if (request.getName() == null ||
                request.getName().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Skill name is required"
            );
        }

        String code = request.getCode()
                .trim()
                .toUpperCase();

        String name = request.getName().trim();

        if (skillRepository.existsByCode(code)) {
            throw new IllegalArgumentException(
                    "Skill code already exists"
            );
        }

        if (skillRepository.existsByName(name)) {
            throw new IllegalArgumentException(
                    "Skill name already exists"
            );
        }

        Skill skill = new Skill();

        skill.setCode(code);
        skill.setName(name);
        skill.setDescription(request.getDescription());
        skill.setActive(request.isActive());
        skill.setDisplayOrder(
                request.getDisplayOrder() != null
                        ? request.getDisplayOrder()
                        : 0
        );

        Skill saved = skillRepository.save(skill);

        return mapToResponse(saved);
    }

    @Override
    public SkillResponse update(
            Long id,
            SkillRequest request
    ) {

        Skill skill = skillRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Skill not found with id: " + id
                        )
                );

        String code = request.getCode()
                .trim()
                .toUpperCase();

        String name = request.getName().trim();

        skillRepository.findByCode(code)
                .ifPresent(existing -> {

                    if (!existing.getId().equals(id)) {
                        throw new IllegalArgumentException(
                                "Skill code already exists"
                        );
                    }
                });

        skillRepository.findByName(name)
                .ifPresent(existing -> {

                    if (!existing.getId().equals(id)) {
                        throw new IllegalArgumentException(
                                "Skill name already exists"
                        );
                    }
                });

        skill.setCode(code);
        skill.setName(name);
        skill.setDescription(request.getDescription());
        skill.setActive(request.isActive());
        skill.setDisplayOrder(
                request.getDisplayOrder() != null
                        ? request.getDisplayOrder()
                        : 0
        );

        Skill updated = skillRepository.save(skill);

        return mapToResponse(updated);
    }

    @Override
    public void delete(Long id) {

        if (!skillRepository.existsById(id)) {
            throw new RuntimeException(
                    "Skill not found with id: " + id
            );
        }

        skillRepository.deleteById(id);
    }

    private SkillResponse mapToResponse(Skill skill) {

        return new SkillResponse(
                skill.getId(),
                skill.getCode(),
                skill.getName(),
                skill.getDescription(),
                skill.isActive(),
                skill.getDisplayOrder(),
                skill.getCreatedAt(),
                skill.getUpdatedAt()
        );
    }
}