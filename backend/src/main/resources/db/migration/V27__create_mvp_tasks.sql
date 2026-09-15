CREATE TABLE mvp_tasks (
    id BIGSERIAL PRIMARY KEY,

    module_id BIGINT NOT NULL,

    title VARCHAR(255) NOT NULL,

    description TEXT,

    task_type VARCHAR(50) NOT NULL,

    priority VARCHAR(50) NOT NULL DEFAULT 'MEDIUM',

    difficulty VARCHAR(50),

    estimated_minutes INTEGER,

    sequence_number INTEGER NOT NULL,

    is_mandatory BOOLEAN NOT NULL DEFAULT TRUE,

    submission_required BOOLEAN NOT NULL DEFAULT FALSE,

    github_required BOOLEAN NOT NULL DEFAULT FALSE,

    deadline_offset_hours INTEGER,

    xp_reward INTEGER NOT NULL DEFAULT 0,

    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_mvp_tasks_module
        FOREIGN KEY (module_id)
        REFERENCES mvp_modules(id)
        ON DELETE CASCADE,

    CONSTRAINT uk_mvp_task_sequence
        UNIQUE (module_id, sequence_number)
);

CREATE INDEX idx_mvp_tasks_module_id
    ON mvp_tasks(module_id);

CREATE INDEX idx_mvp_tasks_status
    ON mvp_tasks(status);