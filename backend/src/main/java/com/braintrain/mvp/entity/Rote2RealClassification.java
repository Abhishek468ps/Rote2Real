package com.braintrain.mvp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "rote2real_classifications")
@Getter
@Setter
@NoArgsConstructor
public class Rote2RealClassification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    private Rote2RealStudent student;

    @Column(name = "completion_pct", nullable = false, precision = 5, scale = 2)
    private BigDecimal completionPct;

    @Column(name = "evidence_score", nullable = false, precision = 5, scale = 2)
    private BigDecimal evidenceScore;

    @Column(name = "consistency_pct", nullable = false, precision = 5, scale = 2)
    private BigDecimal consistencyPct;

    @Column(name = "final_score", nullable = false, precision = 5, scale = 2)
    private BigDecimal finalScore;

    @Column(nullable = false, length = 20)
    private String level;

    @Column(name = "computed_at", nullable = false)
    private LocalDateTime computedAt;

    @PrePersist
    public void prePersist() {
        if (this.computedAt == null) {
            this.computedAt = LocalDateTime.now();
        }
    }
}
