package com.braintrain.mvp;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assumptions;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import static org.junit.jupiter.api.Assertions.assertTrue;

class DatabaseConnectionTest {

    @Test
    void databaseShouldBeConnected() throws Exception {
        String url = System.getenv("DATABASE_URL");
        String username = System.getenv("DATABASE_USERNAME");
        String password = System.getenv("DATABASE_PASSWORD");

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
}
