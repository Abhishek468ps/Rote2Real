package com.braintrain.mvp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rote2real_exercises")
@Getter
@Setter
@NoArgsConstructor
public class Rote2RealExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "day_number", nullable = false, unique = true)
    private Integer dayNumber;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(length = 80)
    private String category;

    @Column(name = "requires_evidence", nullable = false)
    private Boolean requiresEvidence = true;

    @Column(name = "evidence_type", nullable = false, length = 20)
    private String evidenceType = "link";

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @PrePersist
    public void prePersist() {
        if (this.requiresEvidence == null) {
            this.requiresEvidence = true;
        }
        if (this.evidenceType == null) {
            this.evidenceType = "link";
        }
        if (this.isActive == null) {
            this.isActive = true;
        }
    }
}
