ALTER TABLE training_registrations
ADD COLUMN registration_id VARCHAR(100) UNIQUE,
ADD COLUMN payment_status VARCHAR(50) DEFAULT 'PENDING',
ADD COLUMN payment_amount NUMERIC(10,2),
ADD COLUMN razorpay_order_id VARCHAR(100),
ADD COLUMN razorpay_payment_id VARCHAR(100),
ADD COLUMN payment_date TIMESTAMP;
