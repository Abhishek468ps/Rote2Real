ALTER TABLE mvp_plans
ADD COLUMN content_hours INTEGER;

UPDATE mvp_plans
SET content_hours = 48
WHERE code = '48_HOURS';

UPDATE mvp_plans
SET content_hours = 72
WHERE code = '7_DAYS';

UPDATE mvp_plans
SET content_hours = 96
WHERE code = '14_DAYS';

UPDATE mvp_plans
SET content_hours = NULL
WHERE code = '21_DAYS';
