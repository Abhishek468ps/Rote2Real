CREATE TABLE mvp_modules (
    id BIGSERIAL PRIMARY KEY,

    mvp_id BIGINT NOT NULL,

    title VARCHAR(255) NOT NULL,

    description TEXT,

    module_number INTEGER NOT NULL,

    estimated_hours INTEGER,

    difficulty VARCHAR(50),

    learning_objectives TEXT,

    deliverables TEXT,

    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_mvp_modules_mvp
        FOREIGN KEY (mvp_id)
        REFERENCES mvps(id)
        ON DELETE CASCADE,

    CONSTRAINT uk_mvp_module_number
        UNIQUE (mvp_id, module_number)
);

CREATE INDEX idx_mvp_modules_mvp_id
    ON mvp_modules(mvp_id);

CREATE INDEX idx_mvp_modules_status
    ON mvp_modules(status);