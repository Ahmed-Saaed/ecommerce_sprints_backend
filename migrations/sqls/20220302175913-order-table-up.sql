CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  status VARCHAR(64),
  purchace_date date DEFAULT CURRENT_DATE,
  delivery_date date,
  user_id bigint REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);