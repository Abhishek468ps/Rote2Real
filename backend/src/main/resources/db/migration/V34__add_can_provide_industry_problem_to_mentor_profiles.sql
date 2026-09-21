ALTER TABLE mentor_profiles
ADD COLUMN IF NOT EXISTS can_provide_industry_problem BOOLEAN NOT NULL DEFAULT FALSE;
