CREATE TABLE mvp_domains (
    id BIGSERIAL PRIMARY KEY,

    code VARCHAR(100) NOT NULL UNIQUE,

    name VARCHAR(150) NOT NULL,

    description TEXT,

    icon VARCHAR(100),

    color VARCHAR(50),

    active BOOLEAN NOT NULL DEFAULT TRUE,

    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- INITIAL MVP DOMAINS
-- ==========================================

INSERT INTO mvp_domains
(
    code,
    name,
    description,
    icon,
    color,
    active,
    display_order,
    created_at,
    updated_at
)
VALUES
(
    'SOFTWARE_DEVELOPMENT',
    'Software Development',
    'Build real-world software applications, SaaS products, APIs and full-stack systems.',
    'Code2',
    'cyan',
    TRUE,
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'AI_ML',
    'AI / ML',
    'Build practical Artificial Intelligence, Machine Learning and intelligent application projects.',
    'BrainCircuit',
    'purple',
    TRUE,
    2,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'DEVOPS',
    'DevOps',
    'Build, deploy and manage modern cloud, CI/CD and infrastructure solutions.',
    'Cloud',
    'blue',
    TRUE,
    3,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'BIOTECHNOLOGY',
    'Biotechnology',
    'Build technology-driven biotechnology, bioinformatics and life-science projects.',
    'Dna',
    'emerald',
    TRUE,
    4,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);