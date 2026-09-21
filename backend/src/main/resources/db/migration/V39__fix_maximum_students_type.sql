ALTER TABLE mentor_profiles
ALTER COLUMN maximum_students TYPE VARCHAR(255)
USING maximum_students::VARCHAR;
