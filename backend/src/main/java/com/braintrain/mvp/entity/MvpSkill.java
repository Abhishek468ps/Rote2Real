package com.braintrain.mvp.entity;

import jakarta.persistence.*;
import lombok.Builder;
@Entity
@Builder
@Table(
        name = "mvp_skills",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"mvp_id", "skill_id"}
                )
        }
)
public class MvpSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "mvp_id",
            nullable = false
    )
    private Mvp mvp;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "skill_id",
            nullable = false
    )
    private Skill skill;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Mvp getMvp() {
        return mvp;
    }

    public void setMvp(Mvp mvp) {
        this.mvp = mvp;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }
}
