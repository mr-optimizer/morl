-- Initialize database
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Optional: Insert sample data
INSERT INTO users (username, email) VALUES ('admin', 'admin@morl.com');
