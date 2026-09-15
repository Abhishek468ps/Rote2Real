CREATE TABLE mvps (

    id BIGSERIAL PRIMARY KEY,

    mvp_code VARCHAR(50) NOT NULL UNIQUE,

    title VARCHAR(200) NOT NULL,

    slug VARCHAR(250) NOT NULL UNIQUE,

    short_description VARCHAR(500),

    description TEXT,

    domain_id BIGINT NOT NULL,

    category VARCHAR(150),

    difficulty VARCHAR(30) NOT NULL DEFAULT 'BEGINNER',

    prerequisites TEXT,

    learning_outcomes TEXT,

    deliverables TEXT,

    estimated_hours INTEGER,

    min_team_size INTEGER NOT NULL DEFAULT 1,

    max_team_size INTEGER NOT NULL DEFAULT 1,

    team_allowed BOOLEAN NOT NULL DEFAULT FALSE,

    reward_xp INTEGER NOT NULL DEFAULT 0,

    certificate_enabled BOOLEAN NOT NULL DEFAULT TRUE,

    portfolio_enabled BOOLEAN NOT NULL DEFAULT TRUE,

    mentor_enabled BOOLEAN NOT NULL DEFAULT FALSE,

    ai_mentor_enabled BOOLEAN NOT NULL DEFAULT FALSE,

    featured BOOLEAN NOT NULL DEFAULT FALSE,

    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT',

    owner_id BIGINT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    published_at TIMESTAMP,

    completed_at TIMESTAMP,


    CONSTRAINT fk_mvp_domain
        FOREIGN KEY (domain_id)
        REFERENCES mvp_domains(id)
        ON DELETE RESTRICT,


    CONSTRAINT fk_mvp_owner
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE SET NULL,


    CONSTRAINT chk_mvp_team_size
        CHECK (
            min_team_size >= 1
            AND max_team_size >= min_team_size
        ),


    CONSTRAINT chk_mvp_estimated_hours
        CHECK (
            estimated_hours IS NULL
            OR estimated_hours > 0
        ),


    CONSTRAINT chk_mvp_reward_xp
        CHECK (
            reward_xp >= 0
        )
);


-- ==========================================
-- INDEXES
-- ==========================================

CREATE INDEX idx_mvps_domain_id
    ON mvps(domain_id);


CREATE INDEX idx_mvps_status
    ON mvps(status);


CREATE INDEX idx_mvps_owner_id
    ON mvps(owner_id);


CREATE INDEX idx_mvps_featured
    ON mvps(featured);


CREATE INDEX idx_mvps_created_at
    ON mvps(created_at DESC);