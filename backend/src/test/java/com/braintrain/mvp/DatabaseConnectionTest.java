package com.braintrain.mvp;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assumptions;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;

import static org.junit.jupiter.api.Assertions.assertTrue;

class DatabaseConnectionTest {

    @Test
    void databaseShouldBeConnected() throws Exception {
        String url = resolve("DATABASE_URL");
        String username = resolve("DATABASE_USERNAME");
        String password = resolve("DATABASE_PASSWORD");

        Assumptions.assumeTrue(
            url != null && username != null && password != null,
            "Skipping database test: database environment variables are not configured"
        );

        try (Connection connection =
                 DriverManager.getConnection(url, username, password)) {

            assertTrue(connection.isValid(5));

            try (Statement statement = connection.createStatement();
                 ResultSet rs = statement.executeQuery("SELECT 1")) {
                assertTrue(rs.next());
                assertTrue(rs.getInt(1) == 1);
            }
        }
    }

    /**
     * Reads configuration from the process environment first, then falls
     * back to the local (gitignored) .env.properties file so this test
     * actually runs during local builds instead of being skipped.
     */
    private String resolve(String key) {
        String value = System.getenv(key);
        if (value != null && !value.isBlank()) {
            return value;
        }

        Path[] candidates = {
            Path.of(".env.properties"),
            Path.of("backend", ".env.properties")
        };

        for (Path candidate : candidates) {
            if (!Files.isRegularFile(candidate)) {
                continue;
            }
            Properties properties = new Properties();
            try (InputStream in = Files.newInputStream(candidate)) {
                properties.load(in);
            } catch (IOException ignored) {
                continue;
            }
            String fromFile = properties.getProperty(key);
            if (fromFile != null && !fromFile.isBlank()) {
                return fromFile;
            }
        }

        return null;
    }
}
