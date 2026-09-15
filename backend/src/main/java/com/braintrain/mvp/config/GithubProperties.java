package com.braintrain.mvp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "github")
public record GithubProperties(
        String apiUrl,
        String apiVersion,
        String accessToken
) {
}