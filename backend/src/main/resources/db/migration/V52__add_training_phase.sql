ALTER TABLE training_registrations
ADD COLUMN IF NOT EXISTS training_phase VARCHAR(100);
