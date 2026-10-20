CREATE TABLE training_registrations (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    email VARCHAR(255) NOT NULL,

    phone VARCHAR(30) NOT NULL,

    college VARCHAR(255),

    district VARCHAR(150),

    state VARCHAR(100) NOT NULL,

    qualification VARCHAR(100),

    experience VARCHAR(100),

    interest VARCHAR(150),

    tamil_proficiency VARCHAR(50),

    eligibility_confirmed BOOLEAN NOT NULL DEFAULT FALSE,

    training_type VARCHAR(50) NOT NULL DEFAULT 'DEVOPS',

    target_region VARCHAR(100) NOT NULL DEFAULT 'TAMIL_NADU',

    status VARCHAR(50) NOT NULL DEFAULT 'REGISTERED',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE INDEX IF NOT EXISTS idx_training_registrations_email
ON training_registrations(email);

CREATE INDEX IF NOT EXISTS idx_training_registrations_training_type
ON training_registrations(training_type);

CREATE INDEX IF NOT EXISTS idx_training_registrations_state
ON training_registrations(state);

CREATE INDEX IF NOT EXISTS idx_training_registrations_created_at
ON training_registrations(created_at);