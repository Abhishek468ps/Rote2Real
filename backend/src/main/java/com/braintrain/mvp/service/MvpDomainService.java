package com.braintrain.mvp.service;

import com.braintrain.mvp.dto.request.MvpDomainRequest;
import com.braintrain.mvp.dto.response.MvpDomainResponse;
import com.braintrain.mvp.entity.MvpDomain;
import com.braintrain.mvp.repository.MvpDomainRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MvpDomainService {

    private final MvpDomainRepository domainRepository;


    // ==========================================
    // GET ALL DOMAINS
    // ==========================================

    public List<MvpDomainResponse> getAllDomains() {

        return domainRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // ==========================================
    // GET ACTIVE DOMAINS
    // ==========================================

    public List<MvpDomainResponse> getActiveDomains() {

        return domainRepository
                .findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // ==========================================
    // GET DOMAIN BY ID
    // ==========================================

    public MvpDomainResponse getDomainById(
            Long id
    ) {

        MvpDomain domain =
                domainRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "MVP domain not found"
                                )
                        );

        return mapToResponse(domain);
    }


    // ==========================================
    // CREATE DOMAIN
    // ==========================================

    public MvpDomainResponse createDomain(
            MvpDomainRequest request
    ) {

        String code =
                request.getCode()
                        .trim()
                        .toUpperCase();

        if (
            domainRepository.existsByCode(code)
        ) {
            throw new RuntimeException(
                    "MVP domain code already exists"
            );
        }

        MvpDomain domain =
                new MvpDomain();

        domain.setCode(code);

        domain.setName(
                request.getName()
        );

        domain.setDescription(
                request.getDescription()
        );

        domain.setIcon(
                request.getIcon()
        );

        domain.setColor(
                request.getColor()
        );

        domain.setActive(
                request.isActive()
        );

        domain.setDisplayOrder(
                request.getDisplayOrder()
        );

        return mapToResponse(
                domainRepository.save(domain)
        );
    }


    // ==========================================
    // UPDATE DOMAIN
    // ==========================================

    public MvpDomainResponse updateDomain(
            Long id,
            MvpDomainRequest request
    ) {

        MvpDomain domain =
                domainRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "MVP domain not found"
                                )
                        );

        String code =
                request.getCode()
                        .trim()
                        .toUpperCase();

        domainRepository
                .findByCode(code)
                .ifPresent(existing -> {

                    if (
                        !existing
                            .getId()
                            .equals(id)
                    ) {
                        throw new RuntimeException(
                                "MVP domain code already exists"
                        );
                    }
                });

        domain.setCode(code);

        domain.setName(
                request.getName()
        );

        domain.setDescription(
                request.getDescription()
        );

        domain.setIcon(
                request.getIcon()
        );

        domain.setColor(
                request.getColor()
        );

        domain.setActive(
                request.isActive()
        );

        domain.setDisplayOrder(
                request.getDisplayOrder()
        );

        return mapToResponse(
                domainRepository.save(domain)
        );
    }


    // ==========================================
    // DELETE DOMAIN
    // ==========================================

    public void deleteDomain(
            Long id
    ) {

        if (
            !domainRepository.existsById(id)
        ) {
            throw new RuntimeException(
                    "MVP domain not found"
            );
        }

        domainRepository.deleteById(id);
    }


    // ==========================================
    // ENTITY → RESPONSE
    // ==========================================

    private MvpDomainResponse mapToResponse(
            MvpDomain domain
    ) {

        return new MvpDomainResponse(

                domain.getId(),

                domain.getCode(),

                domain.getName(),

                domain.getDescription(),

                domain.getIcon(),

                domain.getColor(),

                domain.isActive(),

                domain.getDisplayOrder()
        );
    }
}