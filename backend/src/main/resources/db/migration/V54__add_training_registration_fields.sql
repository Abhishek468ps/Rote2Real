ALTER TABLE training_registrations
ADD COLUMN IF NOT EXISTS specialization VARCHAR(150);

ALTER TABLE training_registrations
ADD COLUMN IF NOT EXISTS training VARCHAR(50);
