CREATE TABLE mvp_enrollments (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,
    mvp_id BIGINT NOT NULL,
    plan_id BIGINT NOT NULL,

    payment_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',

    enrollment_status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',

    razorpay_order_id VARCHAR(255),
    razorpay_payment_id VARCHAR(255),

    started_at TIMESTAMP,
    deadline_at TIMESTAMP,

    progress_percent INTEGER NOT NULL DEFAULT 0,

    github_repo_name VARCHAR(255),
    github_repo_url TEXT,
    github_repo_created_at TIMESTAMP,

    live_demo_url TEXT,

    completed_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_mvp_enrollment_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_mvp_enrollment_mvp
        FOREIGN KEY (mvp_id)
        REFERENCES mvps(id),

    CONSTRAINT fk_mvp_enrollment_plan
        FOREIGN KEY (plan_id)
        REFERENCES mvp_plans(id),

    CONSTRAINT chk_mvp_enrollment_progress
        CHECK (progress_percent >= 0 AND progress_percent <= 100)
);

CREATE INDEX idx_mvp_enrollments_user_id
    ON mvp_enrollments(user_id);

CREATE INDEX idx_mvp_enrollments_mvp_id
    ON mvp_enrollments(mvp_id);

CREATE INDEX idx_mvp_enrollments_plan_id
    ON mvp_enrollments(plan_id);

CREATE INDEX idx_mvp_enrollments_razorpay_order_id
    ON mvp_enrollments(razorpay_order_id);

CREATE UNIQUE INDEX uq_mvp_enrollment_payment
    ON mvp_enrollments(razorpay_payment_id)
    WHERE razorpay_payment_id IS NOT NULL;