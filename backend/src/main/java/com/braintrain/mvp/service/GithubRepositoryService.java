package com.braintrain.mvp.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GithubRepositoryService {

    private final ObjectMapper objectMapper;

    private final RestTemplate restTemplate = new RestTemplate();

  @Value("${github.api-url:https://api.github.com}")
    private String githubApiUrl;

    @Value("${github.api-version:2022-11-28}")
    private String githubApiVersion;

    /*
     * Token will NEVER be hardcoded here.
     * It will come from application.properties / environment variable.
     */
    @Value("${github.access-token:}")
    private String githubAccessToken;

    @Value("${github.organization:}")
private String githubOrganization;


    public GithubRepositoryResult createRepository(
            String repositoryName,
            String description,
            boolean isPrivate
    ) {

        validateConfiguration();

        if (repositoryName == null || repositoryName.isBlank()) {
            throw new IllegalArgumentException(
                    "Repository name cannot be empty"
            );
        }

     String url = githubApiUrl
        + "/orgs/"
        + githubOrganization
        + "/repos";

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.set("Accept", "application/vnd.github+json");

        headers.setBearerAuth(githubAccessToken);

        headers.set(
                "X-GitHub-Api-Version",
                githubApiVersion
        );


        Map<String, Object> body = new HashMap<>();

        body.put(
                "name",
                repositoryName
        );

        body.put(
                "description",
                description != null ? description : ""
        );

        body.put(
                "private",
                isPrivate
        );

        body.put(
                "has_issues",
                true
        );

        body.put(
                "has_projects",
                true
        );

        body.put(
                "has_wiki",
                true
        );


        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(
                        body,
                        headers
                );


        try {

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            entity,
                            String.class
                    );


            JsonNode json =
                    objectMapper.readTree(
                            response.getBody()
                    );


            String name =
                    json.path("name")
                            .asText();


            String htmlUrl =
                    json.path("html_url")
                            .asText();


            String cloneUrl =
                    json.path("clone_url")
                            .asText();


            return new GithubRepositoryResult(
                    name,
                    htmlUrl,
                    cloneUrl
            );


        } catch (HttpClientErrorException e) {

            throw new RuntimeException(
                    "GitHub API client error: "
                            + e.getStatusCode()
                            + " - "
                            + e.getResponseBodyAsString()
            );

        } catch (HttpServerErrorException e) {

            throw new RuntimeException(
                    "GitHub API server error: "
                            + e.getStatusCode()
            );

        } catch (RestClientException e) {

            throw new RuntimeException(
                    "Could not connect to GitHub API",
                    e
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse GitHub API response",
                    e
            );
        }
    }


    private void validateConfiguration() {

        if (
                githubAccessToken == null
                        || githubAccessToken.isBlank()
        ) {

            throw new IllegalStateException(
                    "GitHub access token is not configured"
            );
        }

        if (
                githubApiUrl == null
                        || githubApiUrl.isBlank()
        ) {

            throw new IllegalStateException(
                    "GitHub API URL is not configured"
            );
        }

        if (
                githubApiVersion == null
                        || githubApiVersion.isBlank()
        ) {

            throw new IllegalStateException(
                    "GitHub API version is not configured"
            );
        }
    }


    public record GithubRepositoryResult(
            String name,
            String htmlUrl,
            String cloneUrl
    ) {
    }
}