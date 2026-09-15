package com.braintrain.mvp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "mvp_technologies",
        uniqueConstraints = {
                @UniqueConstraint(
                         name = "uk_mvp_technology",
                        columnNames = {"mvp_id", "technology_id"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MvpTechnology {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "mvp_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_mvp_technologies_mvp")
    )
    private Mvp mvp;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "technology_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_mvp_technologies_technology")
    )
    private Technology technology;

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

    public Technology getTechnology() {
        return technology;
    }

    public void setTechnology(Technology technology) {
        this.technology = technology;
    }
}