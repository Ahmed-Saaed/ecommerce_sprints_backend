CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100),
    role VARCHAR(20)
    password_digest VARCHAR,
); 