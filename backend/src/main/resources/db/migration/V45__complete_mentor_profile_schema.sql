ALTER TABLE mentor_profiles
ADD COLUMN IF NOT EXISTS skills TEXT;

ALTER TABLE mentor_profiles
ALTER COLUMN preferred_student_levels TYPE TEXT
USING preferred_student_levels::TEXT;
