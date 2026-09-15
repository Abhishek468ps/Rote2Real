-- ============================================================
-- MVP PLANS
-- ============================================================

CREATE TABLE mvp_plans (

    id BIGSERIAL PRIMARY KEY,

    mvp_id BIGINT NOT NULL,

    code VARCHAR(100) NOT NULL,

    name VARCHAR(150) NOT NULL,

    description TEXT,

    duration_hours INTEGER NOT NULL,

    price NUMERIC(12, 2) NOT NULL DEFAULT 0,

    currency VARCHAR(10) NOT NULL DEFAULT 'INR',

    is_free BOOLEAN NOT NULL DEFAULT FALSE,

    max_team_size INTEGER DEFAULT 1,

    certificate_enabled BOOLEAN NOT NULL DEFAULT TRUE,

    portfolio_enabled BOOLEAN NOT NULL DEFAULT TRUE,

    mentor_enabled BOOLEAN NOT NULL DEFAULT FALSE,

    ai_mentor_enabled BOOLEAN NOT NULL DEFAULT FALSE,

    active BOOLEAN NOT NULL DEFAULT TRUE,

    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_mvp_plan_mvp

        FOREIGN KEY (mvp_id)

        REFERENCES mvps(id)

        ON DELETE CASCADE,


    CONSTRAINT uk_mvp_plan_code

        UNIQUE (mvp_id, code),


    CONSTRAINT chk_mvp_plan_duration

        CHECK (duration_hours > 0),


    CONSTRAINT chk_mvp_plan_price

        CHECK (price >= 0),


    CONSTRAINT chk_mvp_plan_team_size

        CHECK (
            max_team_size IS NULL
            OR max_team_size >= 1
        )
);


-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_mvp_plan_mvp_id
    ON mvp_plans(mvp_id);

CREATE INDEX idx_mvp_plan_active
    ON mvp_plans(active);

CREATE INDEX idx_mvp_plan_display_order
    ON mvp_plans(display_order);