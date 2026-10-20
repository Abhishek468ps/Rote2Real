ALTER TABLE mentor_profiles
ADD COLUMN IF NOT EXISTS availability_time VARCHAR(255);
