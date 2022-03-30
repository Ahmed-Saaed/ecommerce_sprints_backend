CREATE TABLE order_payments (id SERIAL PRIMARY KEY, payment_type VARCHAR(100), payment_value integer, order_id bigint REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE); 
