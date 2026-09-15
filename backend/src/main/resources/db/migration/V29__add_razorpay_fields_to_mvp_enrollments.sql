ALTER TABLE mvp_enrollments
ADD COLUMN IF NOT EXISTS razorpay_order_id VARCHAR(255);

ALTER TABLE mvp_enrollments
ADD COLUMN IF NOT EXISTS razorpay_payment_id VARCHAR(255);

CREATE INDEX IF NOT EXISTS idx_mvp_enrollments_razorpay_order_id
ON mvp_enrollments(razorpay_order_id);

CREATE INDEX IF NOT EXISTS idx_mvp_enrollments_razorpay_payment_id
ON mvp_enrollments(razorpay_payment_id);