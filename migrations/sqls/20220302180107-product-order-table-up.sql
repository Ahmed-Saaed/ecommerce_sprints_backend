CREATE TABLE product_order (
  id SERIAL PRIMARY KEY,
  quantity INTEGER,
  product_id bigint REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
  order_id bigint REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE
);