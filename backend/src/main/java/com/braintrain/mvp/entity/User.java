package com.braintrain.mvp.entity;

import com.braintrain.mvp.enums.UserRole;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
    name = "users",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "braintrain_id")
    }
)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @Column(nullable = false)
    private boolean emailVerified = false;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "braintrain_id", unique = true)
    private String braintrainId;

    @Column(nullable = false)
private Integer wallet = 0;

@Column(nullable = false)
private Integer xp = 0;

@Column(name = "last_seen")
private LocalDateTime lastSeen;

private String profileImage;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getBraintrainId() {
        return braintrainId;
    }

    public void setBraintrainId(String braintrainId) {
        this.braintrainId = braintrainId;
    }

    public Integer getWallet() {
    return wallet;
}

public void setWallet(Integer wallet) {
    this.wallet = wallet;
}

public Integer getXp() {
    return xp;
}

public void setXp(Integer xp) {
    this.xp = xp;
}

public String getProfileImage() {
    return profileImage;
}

public void setProfileImage(String profileImage) {
    this.profileImage = profileImage;
}

public LocalDateTime getLastSeen() {
    return lastSeen;
}

public void setLastSeen(LocalDateTime lastSeen) {
    this.lastSeen = lastSeen;
}

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
