-- Rote2Real module: tables are fully separate from existing MVP tables.

CREATE TABLE rote2real_students (
    id                    BIGSERIAL PRIMARY KEY,
    name                  VARCHAR(150) NOT NULL,
    email                 VARCHAR(150) NOT NULL UNIQUE,
    phone                 VARCHAR(20),
    country               VARCHAR(80)  NOT NULL,
    is_international      BOOLEAN      NOT NULL DEFAULT FALSE,
    payment_amount_minor  BIGINT       NOT NULL,             -- paise / cents (e.g. 100 = Rs 1.00)
    payment_currency      VARCHAR(10)  NOT NULL,             -- INR, USD, EUR, ...
    razorpay_order_id     VARCHAR(100),
    razorpay_payment_id   VARCHAR(100),
    payment_status        VARCHAR(20)  NOT NULL DEFAULT 'PENDING', -- PENDING / PAID / FAILED
    registered_at         TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE rote2real_exercises (
    id                BIGSERIAL PRIMARY KEY,
    day_number        INT          NOT NULL UNIQUE,          -- 1 to 20
    title             VARCHAR(200) NOT NULL,
    description       TEXT         NOT NULL,
    category          VARCHAR(80),
    requires_evidence BOOLEAN      NOT NULL DEFAULT TRUE,
    evidence_type     VARCHAR(20)  NOT NULL DEFAULT 'link',  -- link / text / file
    order_index       INT          NOT NULL,
    is_active         BOOLEAN      NOT NULL DEFAULT TRUE
);

CREATE TABLE rote2real_submissions (
    id                 BIGSERIAL PRIMARY KEY,
    student_id         BIGINT      NOT NULL REFERENCES rote2real_students(id),
    exercise_id        BIGINT      NOT NULL REFERENCES rote2real_exercises(id),
    status             VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING / COMPLETED
    evidence_text      TEXT,
    evidence_url       VARCHAR(500),
    evidence_file_path VARCHAR(500),
    quality_score      INT CHECK (quality_score BETWEEN 0 AND 10),
    submitted_at       TIMESTAMP,
    UNIQUE (student_id, exercise_id)
);

CREATE TABLE rote2real_classifications (
    id              BIGSERIAL PRIMARY KEY,
    student_id      BIGINT       NOT NULL UNIQUE REFERENCES rote2real_students(id),
    completion_pct  NUMERIC(5,2) NOT NULL,
    evidence_score  NUMERIC(5,2) NOT NULL,
    consistency_pct NUMERIC(5,2) NOT NULL,
    final_score     NUMERIC(5,2) NOT NULL,
    level           VARCHAR(20)  NOT NULL,                   -- GOLD / SILVER / BRONZE / NOT_CLASSIFIED
    computed_at     TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_r2r_submissions_student  ON rote2real_submissions(student_id);
CREATE INDEX idx_r2r_submissions_exercise ON rote2real_submissions(exercise_id);
