-- ============================================================
-- SKILLS
-- ============================================================

CREATE TABLE skills (
    id BIGSERIAL PRIMARY KEY,

    code VARCHAR(100) NOT NULL UNIQUE,

    name VARCHAR(150) NOT NULL,

    description TEXT,

    category VARCHAR(100),

    active BOOLEAN NOT NULL DEFAULT TRUE,

    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- TECHNOLOGIES
-- ============================================================

CREATE TABLE technologies (
    id BIGSERIAL PRIMARY KEY,

    code VARCHAR(100) NOT NULL UNIQUE,

    name VARCHAR(150) NOT NULL,

    description TEXT,

    category VARCHAR(100),

    active BOOLEAN NOT NULL DEFAULT TRUE,

    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- MVP SKILLS
-- ============================================================

CREATE TABLE mvp_skills (
    id BIGSERIAL PRIMARY KEY,

    mvp_id BIGINT NOT NULL,

    skill_id BIGINT NOT NULL,

    CONSTRAINT fk_mvp_skills_mvp
        FOREIGN KEY (mvp_id)
        REFERENCES mvps(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_mvp_skills_skill
        FOREIGN KEY (skill_id)
        REFERENCES skills(id)
        ON DELETE CASCADE,

    CONSTRAINT uk_mvp_skill
        UNIQUE (mvp_id, skill_id)
);


-- ============================================================
-- MVP TECHNOLOGIES
-- ============================================================

CREATE TABLE mvp_technologies (
    id BIGSERIAL PRIMARY KEY,

    mvp_id BIGINT NOT NULL,

    technology_id BIGINT NOT NULL,

    CONSTRAINT fk_mvp_technologies_mvp
        FOREIGN KEY (mvp_id)
        REFERENCES mvps(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_mvp_technologies_technology
        FOREIGN KEY (technology_id)
        REFERENCES technologies(id)
        ON DELETE CASCADE,

    CONSTRAINT uk_mvp_technology
        UNIQUE (mvp_id, technology_id)
);


-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_skills_active
    ON skills(active);

CREATE INDEX idx_skills_category
    ON skills(category);

CREATE INDEX idx_technologies_active
    ON technologies(active);

CREATE INDEX idx_technologies_category
    ON technologies(category);

CREATE INDEX idx_mvp_skills_mvp_id
    ON mvp_skills(mvp_id);

CREATE INDEX idx_mvp_skills_skill_id
    ON mvp_skills(skill_id);

CREATE INDEX idx_mvp_technologies_mvp_id
    ON mvp_technologies(mvp_id);

CREATE INDEX idx_mvp_technologies_technology_id
    ON mvp_technologies(technology_id);



-- ============================================================
-- INITIAL SKILLS
-- ============================================================

INSERT INTO skills
(
    code,
    name,
    description,
    category,
    active,
    display_order
)
VALUES

(
    'JAVA',
    'Java',
    'Java programming and application development.',
    'PROGRAMMING',
    TRUE,
    1
),

(
    'PYTHON',
    'Python',
    'Python programming for software development, automation and AI/ML.',
    'PROGRAMMING',
    TRUE,
    2
),

(
    'JAVASCRIPT',
    'JavaScript',
    'JavaScript programming for modern web applications.',
    'PROGRAMMING',
    TRUE,
    3
),

(
    'TYPESCRIPT',
    'TypeScript',
    'Typed JavaScript for scalable frontend and backend applications.',
    'PROGRAMMING',
    TRUE,
    4
),

(
    'SQL',
    'SQL',
    'Database querying and relational data management.',
    'DATABASE',
    TRUE,
    5
),

(
    'SPRING_BOOT',
    'Spring Boot',
    'Backend application development using Spring Boot.',
    'BACKEND',
    TRUE,
    6
),

(
    'REACT',
    'React',
    'Frontend development using React.',
    'FRONTEND',
    TRUE,
    7
),

(
    'REST_API',
    'REST API',
    'Design and development of RESTful APIs.',
    'BACKEND',
    TRUE,
    8
),

(
    'DATABASE_DESIGN',
    'Database Design',
    'Relational database design and data modeling.',
    'DATABASE',
    TRUE,
    9
),

(
    'MACHINE_LEARNING',
    'Machine Learning',
    'Machine learning model development and evaluation.',
    'AI_ML',
    TRUE,
    10
),

(
    'DEEP_LEARNING',
    'Deep Learning',
    'Neural network and deep learning model development.',
    'AI_ML',
    TRUE,
    11
),

(
    'NLP',
    'Natural Language Processing',
    'Processing and understanding human language using computational methods.',
    'AI_ML',
    TRUE,
    12
),

(
    'DATA_ANALYSIS',
    'Data Analysis',
    'Analysis and interpretation of structured and unstructured data.',
    'DATA',
    TRUE,
    13
),

(
    'DOCKER',
    'Docker',
    'Containerization and container-based application deployment.',
    'DEVOPS',
    TRUE,
    14
),

(
    'CI_CD',
    'CI/CD',
    'Continuous integration and continuous deployment practices.',
    'DEVOPS',
    TRUE,
    15
),

(
    'CLOUD_DEPLOYMENT',
    'Cloud Deployment',
    'Deployment and management of applications in cloud environments.',
    'DEVOPS',
    TRUE,
    16
),

(
    'BIOTECH_RESEARCH',
    'Biotechnology Research',
    'Research methods and workflows used in biotechnology.',
    'BIOTECHNOLOGY',
    TRUE,
    17
),

(
    'BIOINFORMATICS',
    'Bioinformatics',
    'Computational analysis of biological data.',
    'BIOTECHNOLOGY',
    TRUE,
    18
),

(
    'MOLECULAR_BIOLOGY',
    'Molecular Biology',
    'Core molecular biology concepts and laboratory workflows.',
    'BIOTECHNOLOGY',
    TRUE,
    19
);

-- ============================================================
-- INITIAL TECHNOLOGIES
-- ============================================================

INSERT INTO technologies
(
    code,
    name,
    description,
    category,
    active,
    display_order
)
VALUES

(
    'SPRING_BOOT',
    'Spring Boot',
    'Java framework for backend application development.',
    'BACKEND',
    TRUE,
    1
),

(
    'NEXT_JS',
    'Next.js',
    'React framework for production web applications.',
    'FRONTEND',
    TRUE,
    2
),

(
    'REACT',
    'React',
    'Library for building user interfaces.',
    'FRONTEND',
    TRUE,
    3
),

(
    'TAILWIND_CSS',
    'Tailwind CSS',
    'Utility-first CSS framework.',
    'FRONTEND',
    TRUE,
    4
),

(
    'POSTGRESQL',
    'PostgreSQL',
    'Open-source relational database system.',
    'DATABASE',
    TRUE,
    5
),

(
    'MYSQL',
    'MySQL',
    'Relational database management system.',
    'DATABASE',
    TRUE,
    6
),

(
    'MONGODB',
    'MongoDB',
    'Document-oriented NoSQL database.',
    'DATABASE',
    TRUE,
    7
),

(
    'PYTHON',
    'Python',
    'Programming language widely used in AI, ML and automation.',
    'PROGRAMMING',
    TRUE,
    8
),

(
    'FASTAPI',
    'FastAPI',
    'Modern Python framework for building APIs.',
    'BACKEND',
    TRUE,
    9
),

(
    'TENSORFLOW',
    'TensorFlow',
    'Machine learning and deep learning framework.',
    'AI_ML',
    TRUE,
    10
),

(
    'PYTORCH',
    'PyTorch',
    'Machine learning and deep learning framework.',
    'AI_ML',
    TRUE,
    11
),

(
    'OPENAI_API',
    'OpenAI API',
    'API platform for integrating AI capabilities.',
    'AI_ML',
    TRUE,
    12
),

(
    'DOCKER',
    'Docker',
    'Container platform for application packaging and deployment.',
    'DEVOPS',
    TRUE,
    13
),

(
    'KUBERNETES',
    'Kubernetes',
    'Container orchestration platform.',
    'DEVOPS',
    TRUE,
    14
),

(
    'GITHUB_ACTIONS',
    'GitHub Actions',
    'CI/CD automation platform.',
    'DEVOPS',
    TRUE,
    15
),

(
    'AWS',
    'AWS',
    'Cloud computing platform.',
    'CLOUD',
    TRUE,
    16
),

(
    'AZURE',
    'Microsoft Azure',
    'Cloud computing platform.',
    'CLOUD',
    TRUE,
    17
),

(
    'GIT',
    'Git',
    'Distributed version control system.',
    'DEVELOPMENT',
    TRUE,
    18
),

(
    'JUPYTER',
    'Jupyter',
    'Interactive environment for data science and scientific computing.',
    'DATA',
    TRUE,
    19
);
