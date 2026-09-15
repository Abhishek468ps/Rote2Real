package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.dto.request.TechnologyRequest;
import com.braintrain.mvp.dto.response.TechnologyResponse;
import com.braintrain.mvp.entity.Technology;
import com.braintrain.mvp.repository.TechnologyRepository;
import com.braintrain.mvp.service.TechnologyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TechnologyServiceImpl
        implements TechnologyService {

    private final TechnologyRepository technologyRepository;

    @Override
     @Transactional(readOnly = true)
    public List<TechnologyResponse> getAll() {

        return technologyRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

  @Override
    @Transactional(readOnly = true)
    public List<TechnologyResponse> getActive() {

        return technologyRepository
                .findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public TechnologyResponse getById(Long id) {

        Technology technology =
                technologyRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Technology not found with id: " + id
                                )
                        );

        return mapToResponse(technology);
    }

    @Override
    public TechnologyResponse create(
            TechnologyRequest request
    ) {

        if (request.getCode() == null ||
                request.getCode().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Technology code is required"
            );
        }

        if (request.getName() == null ||
                request.getName().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Technology name is required"
            );
        }

        String code = request.getCode()
                .trim()
                .toUpperCase();

        String name = request.getName().trim();

        if (technologyRepository.existsByCode(code)) {
            throw new IllegalArgumentException(
                    "Technology code already exists"
            );
        }

        if (technologyRepository.existsByName(name)) {
            throw new IllegalArgumentException(
                    "Technology name already exists"
            );
        }

        Technology technology = new Technology();

        technology.setCode(code);
        technology.setName(name);
        technology.setDescription(
                request.getDescription()
        );
        technology.setCategory(
                request.getCategory()
        );
        technology.setActive(
                request.isActive()
        );
        technology.setDisplayOrder(
                request.getDisplayOrder() != null
                        ? request.getDisplayOrder()
                        : 0
        );

        Technology saved =
                technologyRepository.save(technology);

        return mapToResponse(saved);
    }

    @Override
    public TechnologyResponse update(
            Long id,
            TechnologyRequest request
    ) {

        Technology technology =
                technologyRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Technology not found with id: " + id
                                )
                        );

        String code = request.getCode()
                .trim()
                .toUpperCase();

        String name = request.getName().trim();

        technologyRepository.findByCode(code)
                .ifPresent(existing -> {

                    if (!existing.getId().equals(id)) {
                        throw new IllegalArgumentException(
                                "Technology code already exists"
                        );
                    }
                });

        technologyRepository.findByName(name)
                .ifPresent(existing -> {

                    if (!existing.getId().equals(id)) {
                        throw new IllegalArgumentException(
                                "Technology name already exists"
                        );
                    }
                });

        technology.setCode(code);
        technology.setName(name);
        technology.setDescription(
                request.getDescription()
        );
        technology.setCategory(
                request.getCategory()
        );
        technology.setActive(
                request.isActive()
        );
        technology.setDisplayOrder(
                request.getDisplayOrder() != null
                        ? request.getDisplayOrder()
                        : 0
        );

        Technology updated =
                technologyRepository.save(technology);

        return mapToResponse(updated);
    }

    @Override
    public void delete(Long id) {

        if (!technologyRepository.existsById(id)) {
            throw new RuntimeException(
                    "Technology not found with id: " + id
            );
        }

        technologyRepository.deleteById(id);
    }

    private TechnologyResponse mapToResponse(
            Technology technology
    ) {

        return new TechnologyResponse(
                technology.getId(),
                technology.getCode(),
                technology.getName(),
                technology.getDescription(),
                technology.getCategory(),
                technology.isActive(),
                technology.getDisplayOrder(),
                technology.getCreatedAt(),
                technology.getUpdatedAt()
        );
    }
}
