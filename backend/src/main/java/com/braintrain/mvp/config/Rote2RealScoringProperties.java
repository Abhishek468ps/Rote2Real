package com.braintrain.mvp.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
@ConfigurationProperties(prefix = "rote2real.scoring")
@Getter
@Setter
public class Rote2RealScoringProperties {

    /**
     * Weight of completion percentage (e.g. 0.40 for 40%)
     */
    private BigDecimal completionWeight = new BigDecimal("0.40");

    /**
     * Weight of evidence score (e.g. 0.35 for 35%)
     */
    private BigDecimal evidenceWeight = new BigDecimal("0.35");

    /**
     * Weight of consistency percentage (e.g. 0.25 for 25%)
     */
    private BigDecimal consistencyWeight = new BigDecimal("0.25");

    /**
     * Minimum final score for GOLD level
     */
    private BigDecimal goldScoreThreshold = new BigDecimal("85.00");

    /**
     * Minimum completion percentage for GOLD level
     */
    private BigDecimal goldCompletionThreshold = new BigDecimal("90.00");

    /**
     * Minimum final score for SILVER level
     */
    private BigDecimal silverScoreThreshold = new BigDecimal("70.00");

    /**
     * Minimum completion percentage for SILVER level
     */
    private BigDecimal silverCompletionThreshold = new BigDecimal("75.00");

    /**
     * Minimum final score for BRONZE level
     */
    private BigDecimal bronzeScoreThreshold = new BigDecimal("50.00");

    /**
     * Minimum completion percentage for BRONZE level
     */
    private BigDecimal bronzeCompletionThreshold = new BigDecimal("50.00");
}
