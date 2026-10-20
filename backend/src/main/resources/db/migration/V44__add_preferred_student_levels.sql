ALTER TABLE mentor_profiles
ADD COLUMN IF NOT EXISTS preferred_student_levels VARCHAR(255);
