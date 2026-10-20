ALTER TABLE mentor_profiles
ADD COLUMN IF NOT EXISTS mentoring_hours_per_week VARCHAR(255);
